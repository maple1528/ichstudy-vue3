import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import i18n from './locale'

import 'element-plus/dist/index.css'
import '@unocss/reset/tailwind.css'
import './styles/index.less'
import 'uno.css'

const pinia = createPinia()

createApp(App)
  .use(i18n)
  .use(router)
  .use(pinia)
  .use(ElementPlus)
  .mount('#app')
