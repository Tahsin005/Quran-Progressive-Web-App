import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,svg}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === 'https://raw.githubusercontent.com',
            handler: 'NetworkOnly', // No caching for API
          },
        ],
      },
      srcDir: 'src',
      filename: 'sw.js',
      manifest: {
        name: 'Quran PWA',
        short_name: 'Quran',
        start_url: '/',
        display: 'standalone',
        background_color: '#f3f4f6',
        theme_color: '#1c2526',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});