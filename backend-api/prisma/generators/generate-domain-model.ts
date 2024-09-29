import { GeneratorOptions } from '@prisma/generator-helper';
import { writeFileSafely } from './utils/writeFileSafely';

const mapPrismaValueType = (args: { prismaType: string }) => {
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
};

export async function generate(options: GeneratorOptions) {
  try {
    const models = options.dmmf.datamodel.models;

    models.forEach(async (model) => {
      await writeFileSafely(
        `./prisma/__generated__/domain/models/${model.name}Model.ts`,
        `
            import { ${model.name} as Prisma${model.name} } from '@prisma/client';

            export interface ${model.name}ModelDto {
                ${model.fields.map((field) => `${field.name}${field.isRequired ? '' : '?'}: ${mapPrismaValueType({ prismaType: field.type })} ${field.isRequired ? '' : '| null'}`).join('\n  ')}
            }

            export class ${model.name}Model {
                ${model.fields.map((field) => `private readonly _${field.name}${field.isRequired ? '' : '?'}: ${mapPrismaValueType({ prismaType: field.type })}${field.isRequired ? '' : '| null'};`).join('\n  ')}

                private constructor(args: {
                    ${model.fields.map((field) => `${field.name}${field.isRequired ? '' : '?'}: ${mapPrismaValueType({ prismaType: field.type })}${field.isRequired ? '' : '| null'}`).join(';\n')}
                }) {
                    ${model.fields.map((field) => `this._${field.name} = args.${field.name};`).join('\n  ')}
                }

                static fromPrismaValue(args: {
                    self: Prisma${model.name}
                }) {
                    return new ${model.name}Model({
                        ${model.fields.map((field) => `${field.name}: args.self.${field.name}`).join(',\n')}
                    });
                }

                // getters
                ${model.fields
                  .map(
                    (field) => `get ${field.name}() {
                    return this._${field.name};
                }`,
                  )
                  .join('\n\n  ')}
            }
        `,
      );
      console.log(model.name);
      model.fields.forEach((field) => {
        console.log(`  ${field.name}: ${field.type}`);
      });
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
