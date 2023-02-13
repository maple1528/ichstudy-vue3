<script setup lang='ts'>
import Header from './components/Header.vue'
import BackTop from '@/components/BackTop.vue'

defineOptions({ name: 'AppLayout' })
</script>

<template>
  <Header />
  <RouterView />
  <BackTop />
</template>

<style scoped lang='less'>
</style>
