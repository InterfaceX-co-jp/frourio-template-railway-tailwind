/* eslint-disable @typescript-eslint/no-var-requires */
const { nodeExternalsPlugin } = require("esbuild-node-externals");
const path = require("path");

module.exports = {
  entryPoints: [path.resolve(__dirname, "../entrypoints/index.ts")],
  outdir: path.resolve(__dirname, "../"),
  platform: "node",
  target: "node20",
  bundle: true,
  plugins: [nodeExternalsPlugin()],
  logLevel: "info",
};
