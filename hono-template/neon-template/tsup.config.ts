import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  outDir: "dist",
  format: ["esm"],
  target: "node18",
  platform: "node",
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: false,
  minify: false,
  treeshake: true,
  skipNodeModulesBundle: true,
});
