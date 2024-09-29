import { GeneratorOptions } from '@prisma/generator-helper';

export async function generate(options: GeneratorOptions) {
  try {
    const models = options.dmmf.datamodel.models;
    console.log(models);
    //
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
