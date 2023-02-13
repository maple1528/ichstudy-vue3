<script setup lang='ts'>
import { useUserStore } from '@/store/user'
import router from '@/router'

const userStore = useUserStore()

const logout = () => {
  userStore.logout()
  router.replace('/')
}
</script>

<template>
  <div class="content">
    <div class="color" />
    <div class="color" />
    <div class="color" />
    <div class="color" />

    <div class="user-box">
      <div class="user-left">
        <div class="user-top">
          <img src="@/assets/avatar.svg">
          <h2>{{ userStore.username }}</h2>
        </div>
        <ElMenu
          router
          mode="vertical"
          :default-active="$route.path"
          background-color="#00000000"
          text-color="#000"
          active-text-color="#fff"
        >
          <ElMenuItem index="/my">
            {{ $t('myMenu.home') }}
          </ElMenuItem>
          <ElMenuItem index="/my/history">
            {{ $t('myMenu.history') }}
          </ElMenuItem>
        </ElMenu>
        <button class="quit" @click="logout()">
          {{ $t('navList.logout') }}
        </button>
      </div>
      <div class="separate-line" />
      <div class="user-right">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped lang='less'>
.content {
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.el-menu {
  border: none;
  width: 200px;
  margin-bottom: 140px;

  .is-active {
    background-color: #73615d;
  }

  .el-menu-item {
    justify-content: center;
  }
}

.color {
  position: absolute;
  filter: blur(150px);
  z-index: -1;
}

.color:nth-child(1) {
  bottom: -100px;
  right: -100px;
  height: 600px;
  width: 800px;
  background-color: #ffebaae0;
}
.color:nth-child(2) {
  top: 200px;
  right: -100px;
  height: 300px;
  width: 500px;
  background-color: #e9b169e0;
}
.color:nth-child(3) {
  top: -100px;
  left: -100px;
  height: calc(100vh - 100px);
  width: 1000px;
  background-color: #f8db9be0;
}
.color:nth-child(4) {
  left: 500px;
  bottom: -100px;
  height: 400px;
  width: 500px;
  background-color: #e6cab2e0;
}

.user-box {
  height: 80%;
  width: 80%;
  min-width: 1200px;
  background-color: #ffffff71;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  backdrop-filter: blur(50px);
}

.user-left {
  height: 64%;
  width: 200px;
  // margin: 0 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    border: 5px solid #000000;
    border-radius: 50%;
  }

  button {
    width: 200px;
    height: 50px;
  }
}

.user-right {
  height: 640px;
  width: 70%;
  // background: #000;
}

.separate-line {
  height: 50%;
  width: 2px;
  background-color: #ffffffbd;
}
</style>
