import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
// 此处VueMacros报错，参见https://github.com/sxzz/unplugin-vue-macros/issues/257
import VueMacros from 'unplugin-vue-macros/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'
import Compression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (!env.PROXY.startsWith('http://') && !env.PROXY.startsWith('https://')) {
    env.PROXY = `http://${env.PROXY}`
  }
  if (env.BROWSER !== undefined && env.BROWSER !== '') {
    process.env.BROWSER = env.BROWSER
  }
  return {
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
      // https://unocss.dev
      // see unocss.config.ts for config
      UnoCSS(),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          'vue/macros',
          '@vueuse/core',
        ],
        dirs: [
          './src/store',
          // './src/composables',
          './src/hook',
        ],
        dts: './src/types/auto-imports.d.ts',
        resolvers: [
          ElementPlusResolver(),
        ],
        // eslintrc: {
        //   enabled: false, // 自动生成全局声明文件, 不需要eslint检查(在.eslintrc-auto-import.json生成成功之后就可以改为false, 当你更新了导入配置后,将其改为true即可重新生成一次)
        //   filepath: './.eslintrc-auto-import.json',
        //   globalsPropValue: true,
        // },
      }),
      Components({
        dirs: ['src/components'],
        dts: 'src/types/components.d.ts',
        // dts: true,
        resolvers: [
          ElementPlusResolver(),
        ],
      }),
      Compression({
        threshold: 10240, // 对大于 10kb 的文件进行压缩
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    server: {
      port: +env.PORT,
      open: env.OPEN === 'true',
      proxy: {
        // '/api': env.PROXY,
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
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'element-plus': ['element-plus'],
          },
        },
      },
    },
  }
})
