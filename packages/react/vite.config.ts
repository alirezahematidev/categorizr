import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  mode: "production",
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      formats: ["cjs", "es"],
      fileName: "categorizr-react",
    },
  },

  plugins: [
    react(),
    dts({
      tsconfigPath: path.resolve(__dirname, "tsconfig.json"),
      exclude: ["**/vite-*.d.ts"],
      copyDtsFiles: true,
    }),
  ],
  optimizeDeps: {
    include: ["react/jsx-dev-runtime"],
  },
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: {
      "$/react": path.resolve(__dirname, "src"),
    },
  },
});
