import { createI18n } from 'vue-i18n'

const defaultLocale = localStorage.getItem('locale') || 'en-US'

const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>('./*.yml', { eager: true })
  ).map(([key, value]) => {
    return [key.slice(2, 7), value.default]
  })
)

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: 'en-US',
  legacy: false,
  messages
})

export default i18n