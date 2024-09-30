import { GeneratorOptions } from '@prisma/generator-helper';
import { writeFileSafely } from '../utils/writeFileSafely';

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

    // console.log(model.name);
    // model.fields.forEach((field) => {
    //   console.log(`  ${field.name}: ${field.type}`);
    // });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
