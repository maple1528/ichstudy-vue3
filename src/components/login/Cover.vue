<script setup lang='ts'>
import LoginFrom from './LoginFrom.vue'
import RegFrom from './RegFrom.vue'

defineProps<{ type: number }>()
const emit = defineEmits(['close'])

const toClose = () => {
  emit('close')
}
</script>

<template>
  <div v-if="type" class="cover-box">
    <div class="cover">
      <div class="left">
        <img src="@/assets/logo.png" alt="logo">
      </div>
      <div class="right">
        <ElTabs :model-value="type" tab-position="top" stretch>
          <ElTabPane :label="$t('navList.login')" :name="1">
            <LoginFrom @close="toClose" />
          </ElTabPane>
          <ElTabPane :label="$t('navList.reg')" :name="2">
            <RegFrom />
          </ElTabPane>
        </ElTabs>
      </div>
      <div class="color-bg-dark absolute top-6 right-6 cursor-pointer i-tabler-x" @click="$emit('close')" />
    </div>
  </div>
</template>

<style lang="less">
</style>

<style scoped lang='less'>
.cover-box {
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 100;
  background-color: #000000b6;
  backdrop-filter: blur(10px);
}

.cover {
  height: 500px;
  width: 800px;
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  border-radius: 20px;
  overflow: hidden;
}
.left {
  width: 40%;
  display: flex;
  background-color: #ffeeda;
  img {
    margin: auto;
    height: 200px;
    width: 200px;
  }
}

.dark .left {
  background-color: #959494;
}

.right {
  width: 60%;
  padding: 30px 50px;
  background-color: #ffffff;
}

.dark .right {
  background-color: @main-deep-dark;
}
</style>
