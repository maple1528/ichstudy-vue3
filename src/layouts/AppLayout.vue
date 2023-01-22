<template>
  <Header></Header>
  <router-view></router-view>
  <!-- <BackTop></BackTop> -->
</template>

<script setup lang='ts'>
import Header from './components/Header.vue';
import BackTop from '@/components/BackTop.vue';
</script>

<style scoped lang='less'>
</style>
