<script setup lang='ts'>
import { isDark } from '@/composables/dark'
defineOptions({ name: 'HomeBanner' })

const startBtn = () => {
  window.scrollTo({
    top: document.body.offsetHeight,
    behavior: 'smooth',
  })
}
</script>

<template>
  <div class="f-c-c w-full h-screen">
    <div class="content w-60% pr-20">
      <div class="title text-8xl font-600 my-4">
        {{ $t('context.title') }}
      </div>
      <p class="text-lg my-8">
        {{ $t('context.subtitle') }}
      </p>
      <button class="btn text-lg px-10" @click="startBtn()">
        {{ $t('context.start') }}
      </button>
      <div class="mask">
        <!-- <img src="src/assets/ink.png" alt=""> -->
        <img v-show="!isDark" src="src/assets/ink-black.png" alt="">
        <img v-show="isDark" src="src/assets/ink-white.png" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.content {
  position: relative;
}

.title {
  font-family: Montserrat;
}

.mask {
  position: absolute;
  right: -50px;
  top: 50%;
  transform: translateY(-50%);
  z-index: -1;

  img {
    -webkit-mask-image: linear-gradient(#000, #000);;
    mask-image: linear-gradient(#000, #000);;
    mask-repeat: no-repeat;
    mask-position: center;
  }
}
</style>
