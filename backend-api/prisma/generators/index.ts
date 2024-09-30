#!/usr/bin/env node
import { generatorHandler } from '@prisma/generator-helper';
import { generate as generateDomainModel } from './domain-model/generate';

generatorHandler({
  onManifest() {
    return {
      defaultOutput: 'dmmf.json',
      prettyName: 'DMMF JSON',
      version: '1.2.3',
    };
  },
  async onGenerate(options) {
    generateDomainModel(options);
  },
});
