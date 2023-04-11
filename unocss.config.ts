import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  exclude: [
    '.vscode',
    'node_modules',
    'public',
    'dist',
    'build',
  ],
  rules: [
  ],
  shortcuts: [
    {
      'flex-col': 'flex flex-col',
      'f-c-c': 'flex items-center justify-center',
      'f-c-b': 'flex items-center justify-between',
      'icon-btn': 'inline-block cursor-pointer select-none transition duration-200 ease-in-out hover:opacity-100 hover:text-main',
      // 'btn': 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
    },
  ],
  theme: {
    colors: {
      main: '#f59e0b', // 橙色，不随色彩模式改变
      mainDeep: '#382321', // 褐色
      mainDeepDark: '#3f3f3f', // 浅灰
      bgLight: '#f9f3eb', // 米白，日间模式主色
      bgDark: '#242424', // 深灰，夜间模式主色
      textLight: '#382321', // 褐色
      textDark: '#f9f3eb', // 米白
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  // safelist: 'prose prose-sm m-auto text-left'.split(' '),
})
