<template>
  <div class="header">
    <div class="header-logo">LOGO</div>
    <div class="header-list">
      <div @click="routerPush('/home')">{{ $t('navList.home') }}</div>
      <div @click="routerPush('/course')">{{ $t('navList.course') }}</div>
      <div @click="routerPush('/vr')">{{ $t('navList.vr') }}</div>
      <div @click="routerPush('/about')">{{ $t('navList.about') }}</div>
    </div>
    <div>
      <div @click="switchLang">文</div>
      <div>登录{{ userStore.username }}</div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useUserStore } from '@/store/user'
import { routerPush } from '@/utils/common'
import useLocale from '@/hook/useLocale'

const userStore = useUserStore()

const { currentLocale, changeLocale } = useLocale()

const switchLang = () => {
  if (currentLocale.value === 'zh-CN') {
    changeLocale('en-US')
  } else {
    changeLocale('zh-CN')
  }
}

</script>

<style scoped lang='less'>
.header {
  position: fixed;
  top: 0;
  left: 0;
  height: 150px;
  width: 100%;
  background-color: antiquewhite;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
