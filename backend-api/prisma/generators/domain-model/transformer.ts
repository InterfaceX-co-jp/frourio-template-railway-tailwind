import type {
  DMMF as PrismaDMMF,
  ReadonlyDeep,
} from '@prisma/generator-helper';
import { writeFileSafely } from '../utils/writeFileSafely';

export default class Transformer {
  private readonly _models: ReadonlyDeep<PrismaDMMF.Model[]> = [];

  constructor(args: { models: ReadonlyDeep<PrismaDMMF.Model[]> }) {
    this._models = args.models;
  }

  private generatePrismaModelImportStatement(args: {
    model: PrismaDMMF.Model;
  }) {
    return `import { ${args.model.name} as Prisma${args.model.name} } from '@prisma/client';`;
  }

  /**
   * renders a key-value paired field string
   * (e.x.) `name?: string | null`
   */
  private renderKeyValueFieldString(args: { field: PrismaDMMF.Field }) {
    return `${args.field.name}${args.field.isRequired ? '' : '?'}: ${this.mapPrismaValueType({ prismaType: args.field.type })}${args.field.isRequired ? '' : '| null'}`;
  }

  private generateModelDtoInterface(args: { model: PrismaDMMF.Model }) {
    return `
        export interface ${args.model.name}ModelDto {
            ${args.model.fields.map((field) => this.renderKeyValueFieldString({ field })).join('\n  ')}
        }
    `;
  }

  private generateModelGetterFields(args: { model: PrismaDMMF.Model }) {
    return args.model.fields
      .map(
        (field) => `get ${field.name}() {
            return this._${field.name};
        }`,
      )
      .join('\n\n  ');
  }

  private generateModelFields(args: { model: PrismaDMMF.Model }) {
    return args.model.fields
      .map(
        (field) =>
          `private readonly _${this.renderKeyValueFieldString({ field })};`,
      )
      .join('\n  ');
  }

  private generateModelConstructor(args: { model: PrismaDMMF.Model }) {
    return `private constructor(args: {
            ${args.model.fields.map((field) => this.renderKeyValueFieldString({ field })).join(';\n')}
        }) {
            ${args.model.fields.map((field) => `this._${field.name} = args.${field.name};`).join('\n  ')}
        }`;
  }

  private generateStaticFromPrismaValue(args: { model: PrismaDMMF.Model }) {
    return `static fromPrismaValue(args: {
            self: Prisma${args.model.name}
        }) {
            return new ${args.model.name}Model({
                ${args.model.fields.map((field) => `${field.name}: args.self.${field.name}`).join(',\n')}
            });
        }`;
  }

  transform() {
    this._models.forEach(async (model) => {
      await writeFileSafely(
        `./prisma/__generated__/domain/models/${model.name}Model.ts`,
        `
            ${this.generatePrismaModelImportStatement({ model })}

            ${this.generateModelDtoInterface({ model })}

            export class ${model.name}Model {
                ${this.generateModelFields({ model })}

                ${this.generateModelConstructor({ model })}

                ${this.generateStaticFromPrismaValue({ model })}

                // getters
                ${this.generateModelGetterFields({ model })}
            }
        `,
      );
    });
  }

  private mapPrismaValueType(args: { prismaType: string }) {
    switch (args.prismaType) {
      case 'String':
        return 'string';
      case 'Int':
        return 'number';
      case 'Boolean':
        return 'boolean';
      case 'DateTime':
        return 'Date';
      case 'Json':
        return 'Record<string, unknown>';
      case 'Float':
        return 'number';
      case 'Enum':
        return 'string';
      case '$ModelName':
        return 'unknown';
      default:
        return 'unknown';
    }
  }
}
