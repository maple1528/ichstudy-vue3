import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import { useUserStore } from '@/store/user'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: { name: 'home' },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/home.vue'),
  },
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/home.vue'),
      },
      {
        path: '/course',
        name: 'course',
        component: () => import('@/views/course/course.vue'),
      },
      {
        path: '/course/:id',
        name: 'courseInfo',
        component: () => import('@/views/course/info.vue'),
        props: true,
      },
      // {
      //   path: '/course',
      //   components: RouterView,
      //   children: [
      //     {
      //       path: '',
      //       name: 'course',
      //       component: () => import('@/views/course/course.vue')
      //     }
      //   ]
      // },
      {
        path: '/vr',
        name: 'vr',
        component: () => import('@/views/vr/vr.vue'),
      },
      {
        path: '/tourist',
        name: 'tourist',
        component: () => import('@/views/tourist/tourist.vue'),
      },
      {
        path: '/tourist/:id',
        name: 'touristInfo',
        component: () => import('@/views/tourist/info.vue'),
        props: true,
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about/about.vue'),
      },
      {
        path: '/my',
        component: () => import('@/views/my/my.vue'),
        children: [
          {
            path: '',
            name: 'myHome',
            component: () => import('@/views/my/components/myHome.vue'),
          },
          {
            path: 'history',
            name: 'History',
            component: () => import('@/views/my/components/history.vue'),
          },
          // {
          //   path: 'setting',
          //   name: 'Setting',
          //   component: Setting,
          //   meta: {
          //     keepAlive: true
          //   }
          // }
        ],
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(() => {
  const userStore = useUserStore()
  if (userStore.token) {
    userStore.getInfo()
  }
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router
