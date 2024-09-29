#!/usr/bin/env node
import fs from 'node:fs/promises';
import { generatorHandler } from '@prisma/generator-helper';
import assert from 'assert';

generatorHandler({
  onManifest() {
    return {
      defaultOutput: 'dmmf.json',
      prettyName: 'DMMF JSON',
      version: '1.2.3',
    };
  },
  async onGenerate(options) {
    const path = options.generator.output?.value;
    assert(path != null, 'output is required.');
    const content = JSON.stringify(options.dmmf, null, '\t');
    await fs.writeFile(path, content);
  },
});
