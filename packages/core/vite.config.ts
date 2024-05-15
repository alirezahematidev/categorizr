import { defineConfig } from "vite";
import path, { dirname } from "path";
import dts from "vite-plugin-dts";
import { minify } from "rollup-plugin-esbuild";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  mode: "production",
  build: {
    lib: {
      entry: { core: path.resolve(__dirname, "src/main.ts"), functions: path.resolve(__dirname, "src/functions/index.ts") },
      formats: ["es"],
      fileName: (format, name) => `${name}.${format}.js`,
    },
    rollupOptions: {
      output: {
        exports: "named",
      },
      plugins: [minify({ minify: true })],
    },
  },

  plugins: [
    dts({
      tsconfigPath: path.resolve(__dirname, "tsconfig.json"),
      exclude: ["**/__tests__/**", "**/__mocks__/**", "**/vite-*.d.ts"],
      copyDtsFiles: true,
    }),
  ],
  resolve: {
    alias: { "$/core": path.resolve(__dirname, "src") },
  },
});
