<template>
  <div class="content">
    <div class="main">
      <h1 class="title">{{ $t('context.title') }}</h1>
      <p class="subtitle">{{ $t('context.subtitle') }}</p>
      <button class="btn" @click="goTo()">{{ $t('context.start') }}</button>
    </div>
    <div class="bg">
      <div class="square left"></div>
      <div class="square left2"></div>
      <div class="square right"></div>
      <div class="square right2"></div>
      <div class="square img1"></div>
      <div class="square img2"></div>
      <div class="square img3"></div>
    </div>
    <div id="bottom"></div>
  </div>
</template>

<script setup lang='ts'>
const goTo = () => {
  window.scrollTo({
    top: document.body.offsetHeight,
    // top: document.querySelector('.content'),
    behavior: 'smooth'
  })
}

</script>

<style scoped lang='less'>
.content {
  height: 100vh;
  width: 100%;
  display: flex;

  .bottom {
    position: absolute;
    bottom: 0;
  }

  .main {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
  }
  .title {
    width: 500px;
    font-size: 80px;
    text-align: left;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }

  .subtitle {
    width: 700px;
    font-size: 20px;
    text-align: left;
  }

  .btn {
    width: 200px;
    height: 50px;
    border-radius: 80px;
    margin-top: 20px;
  }
}

.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

@sq1: #ff8800;
@sq2: #fcc48fbb;

.square {
  background-color: #ff8800;
  position: absolute;
  border-radius: 15px;
  backdrop-filter: blur(5px);
  box-shadow: 0px 0px 20px @sq2;
}

.left {
  height: 250px;
  width: 250px;
  left: -30px;
  bottom: -40px;
  transform: rotate(20deg);
}

.left2 {
  height: 140px;
  width: 140px;
  left: 150px;
  bottom: 60px;
  transform: rotate(10deg);
  background-color: @sq2;
}

.right {
  height: 800px;
  width: 800px;
  right: -20px;
  bottom: -80px;
  transform: rotate(15deg);
}

.right2 {
  height: 200px;
  width: 200px;
  right: 600px;
  top: 240px;
  transform: rotate(-10deg);
  background-color: @sq2;
}

.img1 {
  height: 200px;
  width: 200px;
  right: 50%;
  bottom: -30px;
  transform: rotate(25deg);
  background-image: url("https://api.ichstudy.com/fstream/?endata={'filetype':'img','filename':'gywy/Snipaste_2022-05-19_15-39-31.png'}");
  background-size: cover;
}

.img2 {
  height: 500px;
  width: 500px;
  right: -80px;
  bottom: 100px;
  transform: rotate(-10deg);
  background-image: url("https://api.ichstudy.com/fstream/?endata={'filetype':'img','filename':'zb/zb.png'}");
  background-size: cover;
}

.img3 {
  height: 400px;
  width: 400px;
  right: 200px;
  bottom: -150px;
  transform: rotate(5deg);
  background-image: url("https://api.ichstudy.com/fstream/?endata={'filetype':'img','filename':'fyjz/fyjz.png'}");
  background-size: cover;
}
</style>
