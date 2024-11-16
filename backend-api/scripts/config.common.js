import { nodeExternalsPlugin } from 'esbuild-node-externals';
import path from 'path';

module.exports = {
  entryPoints: [path.resolve(__dirname, '../entrypoints/index.ts')],
  outdir: path.resolve(__dirname, '../'),
  platform: 'node',
  target: 'node20',
  bundle: true,
  plugins: [nodeExternalsPlugin()],
  logLevel: 'info',
};
