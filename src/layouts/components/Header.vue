<template>
  <div f-c-b fixed top-0 left-0 z-99 w-full px-24 backdrop-blur-9 :style="`background-color: ${bgColor}; box-shadow: ${boxShadow};`">
    <div w-12 h-12>
      <img object-contain v-show="!isDark" src="@/assets/logo.png" alt="logo">
      <img object-contain v-show="isDark" src="@/assets/logo.png" alt="logo">
    </div>

    <div f-c-c>
      <button
        type="button"
        class="group"
        relative mx-4
        v-for="item in navList"
        @click="routerPush(item.router)"
      >
        <span
          after:(content-empty absolute left-0 -bottom-3 w-full h-1 rounded-full bg-amber-900 opacity-0 transition-all)
          group-hover:after:(-bottom-1 opacity-100)
        ></span>
        {{ $t(item.text) }}
      </button>
    </div>

    <div f-c-c>
      <div icon-btn mx-2 @click="switchLang">
        <div i-carbon-ibm-watson-language-translator />
      </div>
      <div icon-btn mx-2 @click="toggleDark()" >
        <div font-8 i="carbon-sun dark:carbon-moon" />
      </div>
      <div f-c-c relative class="group" v-if="userStore.token">
        <div w-8 h-8 b-2 mx-1 b-black rounded-full @click="routerPush('/my')">
          <img object-contain src="@/assets/avatar.svg" alt="avatar" />
        </div>
        <div w-20 mx-1 text-left truncate @click="routerPush('/my')">{{ userStore.username }}</div>
        <ul absolute left-0 top-12 p-3 rounded-3 text-center bg-white shadow divide-y-2 divide-white invisible opacity-0 transition-all delay-100 group-hover:(visible opacity-100)>
          <span before:(content-empty absolute w-0 h-0 b-16 b-t-0 b-transparent b-b-white -translate-x-4 -translate-y-6)></span>
          <li p-2 px-3 rounded-2 hover:(bg-gray-2) transition @click="routerPush('/my')">{{ $t('navList.my') }}</li>
          <li p-2 px-3 rounded-2 hover:(bg-gray-2) transition @click="logout">{{ $t('navList.logout') }}</li>
        </ul>
      </div>
      <div f-c-c v-else>
        <button
          type="button"
          class="group"
          relative mx-2
          @click="changeCover(1)"
        >
          <span
            after:(content-empty absolute left-0 -bottom-3 w-full h-1 rounded-full bg-amber-900 opacity-0 transition-all)
            group-hover:after:(-bottom-1 opacity-100)
          ></span>
          {{ $t('navList.login') }}
        </button>
        <button
          type="button"
          class="group"
          relative mx-3 text-white transition
          hover:text-amber-900
          @click="changeCover(2)"
        >
          <span
            class="after:(w-[calc(100%+1.5rem)] h-[calc(100%+0.5rem)])"
            after:(content-empty absolute -left-3 -bottom-1 -z-1 rounded-full bg-amber-900 opacity-100 transition-all)
            group-hover:after:(-bottom-1 left-0 w-full h-1 opacity-100)
          ></span>
          {{ $t('navList.reg') }}
        </button>
      </div>
    </div>
  </div>
  <Cover :type="showCover" @close="changeCover(0)"></Cover>
</template>

<script setup lang='ts'>
import Cover from '@/components/login/Cover.vue'

import { useUserStore } from '@/store/user'
import { routerPush } from '@/utils/common'
import useLocale from '@/hook/useLocale'
import { onMounted, ref } from 'vue';

import { isDark, toggleDark } from '@/composables/dark'

const userStore = useUserStore()

const showCover = ref(0)
let bgColor = ref('')
let boxShadow = ref('')

interface INavList {
  router: string,
  text: string
}

const navList: Array<INavList> = [
  {
    router: '/home',
    text: 'navList.home'
  },
  {
    router: '/course',
    text: 'navList.course'
  },
  {
    router: '/vr',
    text: 'navList.vr'
  },
  // {
  //   router: '/about',
  //   text: 'navList.about'
  // }
]

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

const { currentLocale, changeLocale } = useLocale()

const switchLang = () => {
  if (currentLocale.value === 'zh-CN') {
    changeLocale('en-US')
  } else {
    changeLocale('zh-CN')
  }
}

const changeCover = (type: number) => {
  showCover.value = type
}

const logout = () => {
  userStore.logout()
}

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  const myOpacity = Math.abs(Math.round(scrollTop)) / 1000
  const myShadow = Math.min(myOpacity / 2, 0.4)
  bgColor.value = 'rgba(249, 243, 235,' + myOpacity + ')'
  boxShadow.value = '5px 5px 20px rgba(115, 97, 93,' + myShadow + ')'
}

</script>

<style scoped lang='less'>
</style>
