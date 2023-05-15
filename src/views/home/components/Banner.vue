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
  <div class="banner f-c-c w-full h-screen">
    <div class="content">
      <div class="title text-8xl font-600 my-4">
        {{ $t('context.title') }}
      </div>
      <div class="w-60% text-lg my-8">
        {{ $t('context.subtitle') }}
      </div>
      <button class="btn text-lg px-10" @click="startBtn()">
        {{ $t('context.start') }}
      </button>
      <div class="ink">
        <!-- <img src="src/assets/ink.png" alt=""> -->
        <img v-show="!isDark" src="src/assets/ink-black.png" alt="">
        <img v-show="isDark" src="src/assets/ink-white.png" alt="">
      </div>
    </div>
    <div class="content mask">
      <div class="title text-8xl font-600 my-4">
        {{ $t('context.title') }}
      </div>
      <div class="w-60% text-lg my-8">
        {{ $t('context.subtitle') }}
      </div>
      <button class="btn text-lg px-10" @click="startBtn()">
        {{ $t('context.start') }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="less">
.banner {
  position: relative;
}
.content {
  width: 60%;
  padding-right: 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.title {
  font-family: Montserrat;
}

.ink {
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  z-index: -1;
}

.content.mask {
  color: @text-dark;

  mask-image: url('@/assets/ink-mask.png');
  mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-image: url('@/assets/ink-mask.png');
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center right;
}
</style>
