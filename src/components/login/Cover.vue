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
      <div class="close" @click="$emit('close')">
        <img src="@/assets/close.svg" alt="close">
      </div>
    </div>
  </div>
</template>

<style scoped lang='less'>
.cover-box {
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 99;
  background-color: #000000b6;
}

.cover {
  height: 500px;
  width: 800px;
  background-color: aliceblue;
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  border-radius: 20px;
  overflow: hidden;

  .close {
    height: 20px;
    width: 20px;
    position: absolute;
    right: 20px;
    top: 20px;
    img {
      height: 100%;
      width: 100%;
    }
  }

}
.left {
  width: 40%;
  display: flex;
  background-color: antiquewhite;
  img {
    margin: auto;
    height: 200px;
    width: 200px;
  }
}

.right {
  @paddingT: 30px;
  @paddingL: 50px;

  width: calc(60% - 2 * @paddingL);
  padding: @paddingT @paddingL;
  background-color: #ffffff;
}
</style>
