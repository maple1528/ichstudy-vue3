<script setup lang='ts'>
import { onMounted, onUnmounted, ref } from 'vue'

const isShow = ref(false)
const scrollTop = ref(0)

const handleScrollTop = () => {
  window.scrollTo({
    top: 0,
  })
}

const handleScroll = () => {
  scrollTop.value = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
  scrollTop.value > 500 ? (isShow.value = true) : (isShow.value = false)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <transition name="slide-fade">
    <button
      v-show="isShow"
      class=" fixed f-c-c right-16 bottom-32 w-12 h-12 rounded-full bg-amber-500/85 backdrop-blur-9 shadow-lg shadow-amber-500/85 z-99 transition"
      @click="handleScrollTop"
    >
      <div class="text-8 text-white" i-carbon-caret-up />
    </button>
  </transition>
</template>

<style scoped lang='less'>
</style>
