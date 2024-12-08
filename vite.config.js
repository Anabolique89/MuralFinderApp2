import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // or true
  },
  rollupOptions: {
    external: ['react-quill/dist/quill.snow.css']
  }
})
