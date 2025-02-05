import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    proxy: {
      '/api': 'https://realtime-chat-backend-q8xl.onrender.com'
    }
   }
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
