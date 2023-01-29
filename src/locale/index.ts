import { createI18n } from 'vue-i18n'

const defaultLocale = localStorage.getItem('locale') || 'en-US'

const messages = Object.fromEntries(
  Object.entries(
    // https://cn.vitejs.dev/guide/features.html#glob-import
    // vue3中使用 import.meta.glob 来引入多个不同的文件
    // vue2中是使用 require.context
    import.meta.glob<{ default: any}>('./*.y(a)?ml', { eager: true })
  ).map(([key, value]) => {
    const yaml = key.endsWith('.yaml')
    return [key.slice(14, yaml ? -5 : -4), value.default]
  })
)

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: 'en-US',
  legacy: false,
  messages,
})

export default i18n