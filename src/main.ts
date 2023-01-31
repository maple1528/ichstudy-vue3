import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import i18n from './locale'

import './styles/index.less'
import 'uno.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const pinia = createPinia()

createApp(App)
  .use(i18n)
  .use(router)
  .use(pinia)
  .use(ElementPlus)
  .mount('#app')
