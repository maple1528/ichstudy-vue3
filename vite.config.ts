import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import UnoCSS from 'unocss/vite'
import VueMacros from 'unplugin-vue-macros/vite'

export default defineConfig({
  plugins: [
    VueMacros({
      plugins: {
        vue: Vue(),
      },
    }),
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [path.resolve(__dirname, 'src/locale/*.yml')],
    }),
    // see unocss.config.ts for config
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  server: {
    open: true,
    proxy: {
      // '/api': {
      //   target: '',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '/api/v1/')
      // }
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve('src/styles/variables.less')}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
})
