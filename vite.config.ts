import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/',
    plugins: [
      react(),
      createHtmlPlugin({
        inject: {
          data: {
            OG_IMAGE: `${env.VITE_SITE_URL}/og-image.png`,
          }
        }
      })
    ],
    publicDir: "public",
    server: {
      host: 'localhost',
      port: 5173,
      strictPort: true,
      open: false,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@comp": path.resolve(__dirname, "src/components"),
        "@constants": path.resolve(__dirname, "src/constants"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@utils": path.resolve(__dirname, "src/utils"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:`
            @use "/src/styles/variables" as *;
            @use "/src/styles/shared" as *;
            @use "sass:color";
            @use "sass:math";`
        },
      },
    },
  };
});