import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './locale'

import 'element-plus/theme-chalk/dark/css-vars.css'
import '@unocss/reset/tailwind.css'
import './styles/index.less'
import 'uno.css'

const pinia = createPinia()

createApp(App)
  .use(i18n)
  .use(router)
  .use(pinia)
  .mount('#app')
