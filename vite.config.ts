import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/',
  plugins: [react()],
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
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:`@use "/src/styles/_variables.scss" as *; @use "sass:color"; @use "sass:math";`
      }
    }
  }
})
