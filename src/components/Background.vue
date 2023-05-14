<script setup lang='ts'>
</script>

<template>
  <div class="background">
    <div class="color" />
    <div class="color" />
    <div class="color" />
    <div class="color" />
  </div>
</template>

<style scoped lang="less">
.background {
  height: 100vh;
  width: 100%;
  position: absolute;
  overflow: hidden;
  z-index: -1;
}

.color {
  position: absolute;
  filter: blur(150px);
}

.color:nth-child(1) {
  bottom: -100px;
  right: -100px;
  height: 600px;
  width: 800px;
  background-color: #ffebaae0;
}
.color:nth-child(2) {
  top: 200px;
  right: -100px;
  height: 300px;
  width: 500px;
  background-color: #e9b169e0;
}
.color:nth-child(3) {
  top: -100px;
  left: -100px;
  height: calc(100vh - 100px);
  width: 1000px;
  background-color: #f8db9be0;
}
.color:nth-child(4) {
  left: 500px;
  bottom: -100px;
  height: 400px;
  width: 500px;
  background-color: #e6cab2e0;
}
.dark .color {
  background-color: transparent;
}
</style>
