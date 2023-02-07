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
      'icon-btn': 'inline-block cursor-pointer select-none transition duration-200 ease-in-out hover:opacity-100 hover:text-amber-500',
      // 'btn': 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
    },
  ],
  theme: {
    colors: {
      main: '#f9f3eb',
      deepMain: '#382321',
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
