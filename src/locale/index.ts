import { createI18n } from 'vue-i18n'

import en from "./en-US"
import zh from "./zh-CN"


const defaultLocale = localStorage.getItem('locale') || 'en-US'
 
const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: 'en-US',
  legacy: false,
  messages: {
    'en-US': en,
    'zh-CN': zh
  },
})

export default i18n