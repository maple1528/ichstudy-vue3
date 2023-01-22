<template>
  <transition name='slide-fade'>
    <div class='page-component-up' v-if='isShow' @click='toTop'>
      <p class="el-icon-caret-top" style="margin: 0px;"></p>
    </div>
  </transition>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

const isShow = ref('false')

const toTop = () => {
  
}
</script>

<style scoped lang='less'>
  .slide-fade-enter-active {
    transition: all .1s ease;
  }
  .slide-fade-leave-active {
    transition: all .1s cubic-bezier(1.0, 0.3, 0.8, 1.0);
    opacity: 0;
  }
  .slide-fade-enter, .slide-fade-leave-to{
    opacity: 0;
  }
  .page-component-up {
    background-color: #ffb35dc0;
    backdrop-filter: blur(10px);
    box-shadow: 0px 0px 8px #ffd7a9c0;
    position: fixed;
    right: 3rem;
    bottom: 8rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    // opacity: .8;
    transition: .3s ease;
    // text-align: center;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-icon-caret-top {
    font-size: 28px;
    // margin-top: 6px;
    color: #FFFFFF;
    text-align: center;
    z-index: 1000
  }
</style>
