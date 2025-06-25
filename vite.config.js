import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: './', // 👈 pour que tous les chemins (assets, scripts) soient relatifs
  plugins: [react()],
  build: {
    outDir: 'build',          // Dossier que Electron va lire dans loadFile()
    emptyOutDir: true,        // Clean avant chaque build
    // target: 'es2020',         // Pour que Electron comprenne les scripts sans transpilation
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 🔄 Alias pour clean imports
    },
  },
})
