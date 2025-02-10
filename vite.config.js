import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/js/modules"),
      "@styles": path.resolve(__dirname, "./src/styles"),
    },
  },
});
