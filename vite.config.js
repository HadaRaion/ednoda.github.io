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
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
    assetsInclude: ["**/*.lottie"], // Lottie 파일 포함
    copyPublicDir: true, // public 디렉토리 복사
  },
});
