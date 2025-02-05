// import path from "path"
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//    server: {
//     proxy: {
//       '/api': 'https://realtime-chat-backend-q8xl.onrender.com'
//     },
//    },
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_NODE_ENV === 'development' 
          ? 'http://localhost:5173/'
          : 'https://realtime-chat-backend-q8xl.onrender.com/',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [react()]
})
