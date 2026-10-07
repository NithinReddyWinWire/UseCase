import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    basicSsl(),
    tailwindcss(),

  ],

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5204",
        changeOrigin: true,
      },
      
      "/apiAuth": {
        target: "http://localhost:5204",
        changeOrigin: true,
      },

      "/Feedback":{
        target: "http://localhost:5204",
        changeOrigin: true,
      }
    },
  },
})
