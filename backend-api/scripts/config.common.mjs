import { nodeExternalsPlugin } from 'esbuild-node-externals';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default {
  entryPoints: [path.resolve(dirname, '../entrypoints/index.ts')],
  outdir: path.resolve(dirname, '../'),
  platform: 'node',
  target: 'node20',
  bundle: true,
  plugins: [nodeExternalsPlugin()],
  logLevel: 'info',
};
