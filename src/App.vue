<script setup lang="ts">
import { onMounted } from 'vue'
// 配置页面标题
const title = import.meta.env.VITE_TITLE
onMounted(() => {
  document.title = title ?? 'ichstudy'
})
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
