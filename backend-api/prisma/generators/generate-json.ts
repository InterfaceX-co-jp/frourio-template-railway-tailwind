import fs from 'node:fs/promises';
import assert from 'assert';
import { GeneratorOptions } from '@prisma/generator-helper';

export async function generate(options: GeneratorOptions) {
  try {
    const path = options.generator.output?.value;
    assert(path != null, 'output is required.');
    const content = JSON.stringify(options.dmmf, null, '\t');
    await fs.writeFile(path, content);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
