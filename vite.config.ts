import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/Hydra-For-Personal-Education/',
  plugins: [react(), tailwindcss()],
})
