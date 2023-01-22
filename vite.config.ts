import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve('./src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  server: {
    open: true,
    proxy: {
      // '/api': {
      //   target: '',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '/api/v1/')
      // }
    }
  }
})
