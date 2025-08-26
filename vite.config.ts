import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'infnet-pb-blog',
  // server: {
  //   open: true, // Isso abre o navegador automaticamente
  //   port: 3000, // Define a porta que você quer usar
  // },
})
