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
        port: 3000,
        strictPort: true,
        open: false
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
                "@styles": path.resolve(__dirname, "src/styles"),
                "@assets": path.resolve(__dirname, "src/assets")
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @use "@styles/variables" as *;
                        @use "sass:color";
                        @use "sass:math";
                    `
                },
            },
        },
    };
});
