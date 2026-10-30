import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Proxy not required since we use VITE_API_BASE_URL, but kept for reference:
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:8000",
    //     changeOrigin: true,
    //   },
    // },
  },
})
