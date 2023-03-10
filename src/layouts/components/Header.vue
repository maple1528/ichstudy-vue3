<script setup lang='ts'>
import { onMounted, onUnmounted, ref } from 'vue'
import Cover from '@/components/login/Cover.vue'

import { useUserStore } from '@/store/user'
import { routerPush } from '@/utils/common'
import useLocale from '@/hook/useLocale'

import { isDark, toggleDark } from '@/composables/dark'

defineOptions({ name: 'Header' })

interface INavList {
  router: string
  text: string
}

// 导航栏列表项
const navList: Array<INavList> = [
  {
    router: '/home',
    text: 'navList.home',
  },
  {
    router: '/course',
    text: 'navList.course',
  },
  {
    router: '/vr',
    text: 'navList.vr',
  },
  // {
  //   router: '/about',
  //   text: 'navList.about'
  // }
]

// 切换语言
const { currentLocale, changeLocale } = useLocale()

const switchLang = () => {
  if (currentLocale.value === 'zh-CN') {
    changeLocale('en-US')
  } else {
    changeLocale('zh-CN')
  }
}

// 显示登录注册弹窗
const showCover = ref(0)

const changeCover = (type: number) => {
  showCover.value = type
}

// 退出登录
const userStore = useUserStore()

const logout = () => {
  userStore.logout()
}

// 导航栏透明度和阴影随滚动位置变化
const bgColor = ref('')
const darkBgColor = ref('')
const boxShadow = ref('')

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  const myOpacity = Math.abs(Math.round(scrollTop)) / 1000
  const myShadow = Math.min(myOpacity / 2, 0.4)
  bgColor.value = `rgba(249, 243, 235, ${myOpacity})`
  darkBgColor.value = `rgba(63, 63, 63, ${myOpacity})`
  boxShadow.value = `5px 5px 20px rgba(115, 97, 93, ${myShadow})`
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="nav f-c-b fixed top-0 left-0 z-99 w-full px-24 backdrop-blur-9">
    <div class="w-12 h-12">
      <img v-show="!isDark" class="object-contain" src="@/assets/logo.png" alt="logo">
      <img v-show="isDark" class="object-contain" src="@/assets/logo.png" alt="logo">
    </div>

    <div class="f-c-c">
      <button
        v-for="(item, i) in navList"
        :key="i"
        type="button"
        class="group relative mx-4"
        @click="routerPush(item.router)"
      >
        <span class="dec" />
        {{ $t(item.text) }}
      </button>
    </div>

    <div class="f-c-c">
      <div class="icon-btn mx-2" @click="switchLang">
        <div i-carbon-ibm-watson-language-translator />
      </div>
      <div class="icon-btn mx-2" @click="toggleDark()">
        <div i="carbon-sun dark:carbon-moon" />
      </div>
      <div v-if="userStore.token" class="group f-c-c relative">
        <div class="w-8 h-8 b-2 mx-2 b-black rounded-full" @click="routerPush('/my')">
          <img class="object-contain" src="@/assets/avatar.svg" alt="avatar">
        </div>
        <div class="w-20 mx-2 text-left truncate" @click="routerPush('/my')">
          {{ userStore.username }}
        </div>
        <ul class="absolute left-0 top-12 p-3 rounded-3 text-center bg-white shadow divide-y-2 divide-white invisible opacity-0 transition-all delay-100 group-hover:(visible opacity-100)">
          <span class="before:(content-empty absolute w-0 h-0 b-16 b-t-0 b-transparent b-b-white -translate-x-4 -translate-y-6)" />
          <li class="p-2 px-3 rounded-2 hover:(bg-gray-2) transition" @click="routerPush('/my')">
            {{ $t('navList.my') }}
          </li>
          <li class="p-2 px-3 rounded-2 hover:(bg-gray-2) transition" @click="logout">
            {{ $t('navList.logout') }}
          </li>
        </ul>
      </div>
      <div v-else class="f-c-c">
        <button
          type="button"
          class="group relative mx-3"
          @click="changeCover(1)"
        >
          <span class="dec" />
          {{ $t('navList.login') }}
        </button>
        <button
          type="button"
          class="group relative mx-4 text-white transition hover:text-mainDeep dark:hover:text-bg-light"
          @click="changeCover(2)"
        >
          <span class="after:(content-empty absolute -left-4 -bottom-1 -z-1 w-[calc(100%+2rem)] h-[calc(100%+0.5rem)] rounded-full bg-main opacity-100 transition-all) group-hover:after:(-bottom-1 left-0 w-full h-1 opacity-100)" />
          {{ $t('navList.reg') }}
        </button>
      </div>
    </div>
  </div>
  <Cover :type="showCover" @close="changeCover(0)" />
</template>

<style scoped>
.dec {
  @apply after:(content-empty absolute left-0 -bottom-3 w-full h-1 rounded-full bg-main opacity-0 transition-all) group-hover:after:(-bottom-1 opacity-100)
}

.nav {
  background: v-bind(bgColor);
  box-shadow: v-bind(boxShadow);
}

.dark .nav {
  background: v-bind(darkBgColor);
  box-shadow: none;
}
</style>
