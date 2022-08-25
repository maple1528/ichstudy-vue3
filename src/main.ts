import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import i18n from './locale'

import './styles/index.less'

const pinia = createPinia()

createApp(App)
  .use(i18n)
  .use(router)
  .use(pinia)
  .mount('#app')
