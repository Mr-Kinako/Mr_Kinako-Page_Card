import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path, { resolve } from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    base: "/",
    plugins: [react()],
    publicDir: "public",
    server: {
      host: true,
      port: 5173,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    css: {
      modules: {
        // Делает имена классов в DOM удобными для чтения при разработке (напр. Home_container__H3aK1)
        generateScopedName: "[name]__[local]___[hash:base64:5]",
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@use "sass:color";`,
        },
      },
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      target: "es2022",
      rolldownOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          kinland: resolve(__dirname, "kinland/index.html"),
        },
      },
    },
  };
});
