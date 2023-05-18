<script setup lang='ts'>
import Header from './components/Header.vue'

defineOptions({ name: 'AppLayout' })
</script>

<template>
  <Header />
  <RouterView />
  <BackTop />
</template>

<style scoped lang='less'>

</style>
