import { createRouter, createWebHashHistory, RouteRecordRaw, RouterView } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: { name: 'home' }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
