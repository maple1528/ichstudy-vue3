<template>
  <div class="header">
    <div class="header-logo">LOGO</div>
    <div class="header-list">
      <div>home</div>
      <div>course</div>
      <div>vr</div>
      <div>about</div>
    </div>
    <div>
      <div>文</div>
      <div>登录{{ userStore.username }}</div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
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
