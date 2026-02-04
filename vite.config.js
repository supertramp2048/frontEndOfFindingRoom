import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    host: true,
    cors: true
  },
  build: {
    target: 'esnext',
    minify: 'terser'
  }
})
