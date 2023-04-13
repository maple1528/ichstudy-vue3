<script setup lang='ts'>
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
    <div class="w-70% pr-40">
      <h1 class="text-8xl font-600 my-4">
        {{ $t('context.title') }}
      </h1>
      <p class="text-lg my-8">
        {{ $t('context.subtitle') }}
      </p>
      <button class="text-lg py-3 px-10 rounded-full bg-main text-bg-dark" @click="startBtn()">
        {{ $t('context.start') }}
      </button>
    </div>
    <div class="absolute w-full h-full of-hidden -z-1">
      <div class="absolute right-0 bottom-0 grid grid-cols-5 gap-4 -rotate-20">
        <!-- <div class="grid-item">
          01
        </div>
        <div class="grid-item">
          02
        </div>
        <div class="grid-item">
          03
        </div>
        <div class="grid-item">
          04
        </div>
        <div class="grid-item">
          05
        </div>
        <div class="grid-item">
          06
        </div>
        <div class="grid-item">
          07
        </div>
        <div class="grid-item">
          08
        </div>
        <div class="grid-item">
          09
        </div>
        <div class="grid-item">
          10
        </div>
        <div class="grid-item">
          11
        </div>
        <div class="grid-item">
          12
        </div>
        <div class="grid-item">
          13
        </div>
        <div class="grid-item">
          14
        </div>
        <div class="grid-item">
          15
        </div>
        <div class="grid-item">
          16
        </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .grid-item {
  @apply w-36 h-36 bg-amber-500 rounded-3xl;
} */
</style>
