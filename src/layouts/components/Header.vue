<template>
  <div class="header flex-between-center">
    <div class="header-logo">
      <img src="@/assets/logo.png" alt="logo">
    </div>

    <div class="header-list flex-between-center">
      <div class="list-item" v-for="item in navList" @click="routerPush(item.router)"><span></span>{{ $t(item.text) }}</div>
    </div>

    <div class="header-right flex-between-center">
      <div class="lang" @click="switchLang">
        <img src="@/assets/lang.svg" alt="languages">
      </div>
      <div class="user-box flex-between-center" v-if="userStore.token">
        <div class="avatar" @click="routerPush('/my')">
          <img src="@/assets/avatar.svg" alt="avatar" />
        </div>
        <div class="username" @click="routerPush('/my')">{{ userStore.username }}</div>
        <ul class="hidden-list">
          <li @click="routerPush('/my')">{{ $t('navList.my') }}</li>
          <li @click="logout">{{ $t('navList.logout') }}</li>
        </ul>
      </div>
      <div class="user-box flex-between-center" v-else>
        <div class="user-item login" @click="changeCover(1)"><span></span>{{ $t('navList.login') }}</div>
        <div class="user-item register" @click="changeCover(2)"><span></span>{{ $t('navList.reg') }}</div>
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
  const opacity = Math.abs(Math.round(scrollTop)) / 1000
  const shadow = Math.min(opacity / 2, 0.4)
  bgColor.value = 'rgba(249, 243, 235,' + opacity + ')'
  boxShadow.value = '5px 5px 20px rgba(115, 97, 93,' + shadow + ')'
}

</script>

<style scoped lang='less'>
.header {
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  width: 90%;
  min-width: 650px;
  background-color: v-bind(bgColor);
  box-shadow: v-bind(boxShadow);
  padding: 0 5%;
  backdrop-filter: blur(10px);
  z-index: 88;
}

.header-logo {
  height: 60px;
  width: 120px;

  img {
    // width: 100%;
    height: 100%;
  }
}

.list-item {
  width: 80px;
  margin: 0 5px;
  position: relative;
}

.lang {
  height: 35px;
  width: 35px;
  margin-right: 10px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    transform: translateX(-40px);
    filter: drop-shadow(#000000 40px 0);
  }
}

.avatar {
  height: 30px;
  width: 30px;
  border: #000000 solid 2px;
  border-radius: 50%;
}

.username {
  width: 90px;
  height: 30px;
  line-height: 30px;
  text-align: left;
  margin-left: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.user-box {
  position: relative;

  ul {
    position: absolute;
    list-style: none;
    top: 80px;
    left: 0px;
    width: 150px;
    padding: 8px 0px;
    border-radius: 6px;
    background-color: #FFFFFF;
    color: #000000;
    box-shadow: 0px 5px 15px #777777d5;
    opacity: 0;
    visibility: hidden;
    transition: .5s ease-out;
    z-index: 1;
  }

  li {
    margin: 5px 10px;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    transition: .3s ease;
  }

  li:hover {
    cursor: pointer;
    background-color: #eee;
  }

  .hidden-list::before {
    content: '';
    z-index: -1;
    position: absolute;
    top: -8px;
    left: calc(50% - 8px);
    height: 16px;
    width: 16px;
    background-color: #ffffff;
    transform: rotate(45deg);
  }
}

.avatar:hover ~ ul,
.username:hover ~ ul,
ul:hover {
  top: 40px;
  opacity: 1;
  visibility: visible;
}

.user-item {
  width: 70px;
}

.list-item, .user-item, .lang, .avatar, .username{
  cursor: pointer;
}

.list-item span::before, .login span::before {
  content: '';
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background-color: #73615d;
  position: absolute;
  bottom: -10px;
  left: 20px;
  opacity: 0;
  transition: .3s ease;
  z-index: -1;
}

.list-item:nth-child(2) span::before {
  left: 6px;
  width: 68px;
}

.login span::before {
  left: 15px;
}

.list-item:hover span::before, .login:hover span::before {
  bottom: -4px;
  opacity: 1;
}

.register {
  position: relative;
  color: #FFFFFF;
  transition: .3s ease;

  span::before {
    content: '';
    width: 70px;
    height: 32px;
    border-radius: 2px;
    background-color: #73615d;
    position: absolute;
    transition: .3s ease;
    bottom: -4px;
    left: 0px;
    opacity: 1;
    z-index: -1;
  }
}

.register:hover {
  color: #73615d;

  span::before {
    height: 4px;
    width: 40px;
    left: 15px;
  }
}

</style>
