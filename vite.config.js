import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        start_url: '/index.html',
        lang: 'ja',
        icons: [
          {
            src: 'maroon96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: 'maroon.png',
            sizes: '718x718',
            type: 'image/png'
          },
        ]
      }
    })
  ]
})
