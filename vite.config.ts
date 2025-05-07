// blog/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/learn', // <-- set this to your repo name with slashes
  plugins: [react()],
})