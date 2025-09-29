import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/nominatim': {
        target: 'https://nominatim.openstreetmap.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nominatim/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('User-Agent', 'RakshaNetApp/1.0');
          });
        },
      },
      '/osrm': {
        target: 'http://router.project-osrm.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/osrm/, ''),
      },
    },
  },
})