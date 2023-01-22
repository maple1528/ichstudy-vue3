<template>
  <div class="content flex-column-center">
    <h2>{{ $t('navList.vr') }}</h2>
    <div class="main">
      <div class="card">
        <img src="https://api.ichstudy.com/fstream/?endata={'filetype':'img','filename':'vr/jn.png'}" alt="">
        <div class="box">
          <h2>{{ currentLocale === 'zh-CN' ? '中国畲族博物馆' : 'China She Nationality Museum' }}</h2>
          <button>{{ $t('context.more') }}</button>
        </div>
      </div>
      <div class="card">
        <img src="https://api.ichstudy.com/fstream/?endata={'filetype':'img','filename':'vr/lz.png'}" alt="">
        <div class="box">
          <h2>{{ currentLocale === 'zh-CN' ? '龙珠' : 'Longzhu' }}</h2>
          <button>{{ $t('context.more') }}</button>
        </div>
      </div>
    </div>
    <button class="more">{{ $t('context.more') }}</button>
  </div>
</template>

<script setup lang='ts'>
import useLocale from '@/hook/useLocale'
const { currentLocale } = useLocale()
</script>

<style scoped lang='less'>
.content {
  height: 100vh;
  width: 100%;
}

.main {
  height: 50%;
  margin: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.more {
  border-radius: 30px;
  width: 150px;
}

.card {
  width: 480px;
  height: 90%;
  margin: 0 40px;
  padding: 0;
  border-radius: 8px;
  position: relative;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: .3s;
  }

  .box {
    position: absolute;
    bottom: -120px;
    height: 120px;
    width: 100%;
    color: #fff;
    background: #00000075;
    transition: .3s;
  }
}

.card:hover {
  img {
    transform: scale(1.05);
  }
  .box {
    bottom: 0px;
  }
}
</style>
