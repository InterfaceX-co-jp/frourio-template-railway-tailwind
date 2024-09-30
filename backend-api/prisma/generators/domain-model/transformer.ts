import type {
  DMMF as PrismaDMMF,
  ReadonlyDeep,
} from '@prisma/generator-helper';
import { writeFileSafely } from '../utils/writeFileSafely';
import path from 'path';
import removeDir from '../utils/removeDir';

export default class Transformer {
  private readonly _models: ReadonlyDeep<PrismaDMMF.Model[]> = [];
  private static outputPath: string = './prisma/__generated__';

  constructor(args: { models: ReadonlyDeep<PrismaDMMF.Model[]> }) {
    this._models = args.models;
  }

  private generatePrismaModelImportStatement(args: {
    model: PrismaDMMF.Model;
  }) {
    const imports = args.model.fields.map((field) => {
      if (field.relationName) {
        return `${field.type} as Prisma${field.type}`;
      }

      return '';
    });

    return `import { 
              ${args.model.name} as Prisma${args.model.name}, 
              ${imports.filter((i) => i).join(', ')}
            } from '@prisma/client';`;
  }

  /**
   * renders a key-value paired field string
   * (e.x.) `name?: string | null`
   */
  private renderKeyValueFieldStringFromDMMFField(args: {
    field: PrismaDMMF.Field;
    overrideValue?: string;
  }) {
    if (args.field.relationName) {
      if (args.field.isList) {
        return `${args.field.name}${args.field.isRequired ? '' : '?'}: Prisma${args.field.type}[]`;
      }

      return `${args.field.name}${args.field.isRequired ? '' : '?'}: ${args.overrideValue ? args.overrideValue : this.mapPrismaValueType({ field: args.field })}${args.field.isRequired ? '' : '| null'}`;
    }

    return `${args.field.name}${args.field.isRequired ? '' : '?'}: ${args.overrideValue ? args.overrideValue : this.mapPrismaValueType({ field: args.field })}${args.field.isRequired ? '' : '| null'}`;
  }

  private generateModelDtoInterface(args: { model: PrismaDMMF.Model }) {
    return `
        export interface ${args.model.name}ModelDto {
            ${args.model.fields
              .map((field) => {
                if (field.relationName) {
                  return this.renderKeyValueFieldStringFromDMMFField({
                    field,
                    overrideValue: 'Prisma' + field.type,
                  });
                }

                return this.renderKeyValueFieldStringFromDMMFField({
                  field,
                  overrideValue:
                    field.type === 'DateTime' ? 'string' : undefined, // DTO needs to be string for Date
                });
              })
              .join('\n  ')}
        }
    `;
  }

  private generateModelGetterFields(args: { model: PrismaDMMF.Model }) {
    return args.model.fields
      .map((field) => {
        return `get ${field.name}() {
            return this._${field.name};
        }`;
      })
      .join('\n\n  ');
  }

  private generateModelFields(args: { model: PrismaDMMF.Model }) {
    return args.model.fields
      .map((field) => {
        return `private readonly _${this.renderKeyValueFieldStringFromDMMFField({ field })};`;
      })
      .join('\n  ');
  }

  private generateModelConstructor(args: { model: PrismaDMMF.Model }) {
    return `private constructor(args: {
            ${args.model.fields
              .map((field) => {
                return this.renderKeyValueFieldStringFromDMMFField({ field });
              })
              .join(';\n')}
        }) {
            ${args.model.fields
              .map((field) => {
                return `this._${field.name} = args.${field.name};`;
              })
              .join('\n  ')}
        }`;
  }

  private generateStaticFromPrismaValue(args: { model: PrismaDMMF.Model }) {
    return `static fromPrismaValue(args: {
            self: Prisma${args.model.name}
            ${args.model.fields
              .map((field) => {
                if (field.relationName) {
                  return `${field.relationName}: Prisma${field.type}${field.isList ? '[]' : ''}`;
                }

                return '';
              })
              .join(';\n')}
        }) {
            return new ${args.model.name}Model({
                ${args.model.fields
                  .map((field) => {
                    return `${field.name}: args.self.${field.name}`;
                  })
                  .join(',\n')}
            });
        }`;
  }

  private generateToDtoMethod(args: { model: PrismaDMMF.Model }) {
    return `toDto() {
            return {
                ${args.model.fields
                  .map((field) => {
                    if (field.type === 'DateTime') {
                      return `${field.name}: this._${field.name}.toISOString()`; // convert Date to string
                    }

                    if (field.relationName) {
                      return '';
                    }

                    return `${field.name}: this._${field.name}`;
                  })
                  .join(',\n')}
            };
        }`;
  }

  async transform() {
    await removeDir(path.join(Transformer.outputPath, 'domain/models'), true);

    await Promise.all(
      this._models.map((model) =>
        writeFileSafely(
          path.join(
            Transformer.outputPath,
            `domain/models/${model.name}Model.ts`,
          ),
          `
          ${this.generatePrismaModelImportStatement({ model })}

          ${this.generateModelDtoInterface({ model })}

          export class ${model.name}Model {
              ${this.generateModelFields({ model })}

              ${this.generateModelConstructor({ model })}

              ${this.generateStaticFromPrismaValue({ model })}

              ${this.generateToDtoMethod({ model })}

              // getters
              ${this.generateModelGetterFields({ model })}
          }
        `,
        ),
      ),
    );
  }

  private mapPrismaValueType(args: { field: PrismaDMMF.Field }) {
    switch (args.field.type) {
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
      case args.field.type:
        return `Prisma${args.field.type}`;
      default:
        return 'unknown';
    }
  }
}
