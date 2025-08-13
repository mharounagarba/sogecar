
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
   base: './', // 👈 nécessaire pour que les assets soient bien trouvés
  plugins: [react()],
  build: {
    outDir: 'build', // ✅ Dossier isolé
    emptyOutDir: true
  }
})
