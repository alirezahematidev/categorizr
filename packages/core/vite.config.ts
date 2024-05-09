import { defineConfig } from "vite";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "$/core": path.resolve(__dirname, "src"),
    },
  },
});
