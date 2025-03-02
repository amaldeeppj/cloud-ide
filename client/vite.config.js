import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // Allows Vite to listen on all network interfaces
    port: 5175, // Change this if needed
    allowedHosts: ['project.alanapj.site'], // Allow this specific host
    strictPort: true, // Prevents automatic port switching
  },
  plugins: [react()],
})

