<script setup lang='ts'>
import Background from '@/components/Background.vue'
import router from '@/router'

const userStore = useUserStore()

const logout = () => {
  userStore.logout()
  router.replace('/')
}
</script>

<template>
  <div class="content">
    <Background />
    <div class="user-box">
      <div class="user-left">
        <div class="user-top">
          <div i-carbon-face-cool text-26 />
          <h2>{{ userStore.username }}</h2>
        </div>
        <ElMenu
          router
          mode="vertical"
          :default-active="$route.path"
          background-color="#00000000"
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
.el-menu {
  border: none;
  width: 200px;
  margin-bottom: 140px;

  .is-active {
    background-color: @main;
  }

  .el-menu-item {
    justify-content: center;
    margin: 3px 0px;
    border-radius: 99px;
  }
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

.dark .user-box {
  background-color: #6a6a6a70;
}

.user-left {
  height: 64%;
  width: 200px;
  // margin: 0 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  h2 {
    text-align: center;
    line-height: 40px;
  }

  .quit {
    width: 200px;
    height: 56px;
    background-color: @main;
    color: @text-dark;
    border-radius: 99px;
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
