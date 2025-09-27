import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    globals: true,          // bisa pakai describe/it/expect tanpa import manual
    environment: "jsdom",   // simulasi DOM (wajib untuk React component)
    setupFiles: "./setupTests.js", // file setup tambahan
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
