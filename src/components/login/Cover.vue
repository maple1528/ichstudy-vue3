<template>
  <div class="cover-box" v-if="type">
    <div class="cover">
      <div class="left">
        <img src="@/assets/logo.png" alt="logo">
      </div>
      <div class="right">
        <el-tabs :model-value="type" tab-position="top" stretch>
          <el-tab-pane :label="$t('navList.login')" :name="1">
            <login-from @close="toClose"></login-from>
          </el-tab-pane>
          <el-tab-pane :label="$t('navList.reg')" :name="2">
            <reg-from></reg-from>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="close" @click="$emit('close')">
        <img src="@/assets/close.svg" alt="close" />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import LoginFrom from './LoginFrom.vue'
import RegFrom from './RegFrom.vue'

defineProps<{ type: number }>()
const emit = defineEmits(['close'])

const toClose = () => {
  emit('close')
}


</script>

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
