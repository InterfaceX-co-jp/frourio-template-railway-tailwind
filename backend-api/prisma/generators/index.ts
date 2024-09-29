#!/usr/bin/env node
import { generatorHandler } from '@prisma/generator-helper';

generatorHandler({
  onManifest() {
    return {
      defaultOutput: 'dmmf.json',
      prettyName: 'DMMF JSON',
      version: '1.2.3',
    };
  },
  async onGenerate(options) {
    console.log(options.dmmf.datamodel);
  },
});
