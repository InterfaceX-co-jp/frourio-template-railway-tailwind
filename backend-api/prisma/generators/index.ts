#!/usr/bin/env node
import { generatorHandler } from '@prisma/generator-helper';
import { generate as generateDomainModel } from './domain-model/generate';

generatorHandler({
  onManifest() {
    return {
      defaultOutput: '__generated__/domain/models',
      prettyName: 'Base Domain Models',
      version: '1.0.0',
    };
  },
  onGenerate: generateDomainModel,
});
