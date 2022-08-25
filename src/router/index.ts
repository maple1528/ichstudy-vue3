import { createRouter, createWebHashHistory, RouteRecordRaw, RouterView } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: { name: 'home' }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/home.vue')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import('@/views/course/course.vue')
      },
      {
        path: '/vr',
        name: 'vr',
        component: () => import('@/views/vr/vr.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about/about.vue')
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
