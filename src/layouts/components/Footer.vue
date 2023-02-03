<script setup lang='ts'>
</script>

<template>
  <div class="footer flex-center-item">
    <div class="left">
      <h2>{{ $t('footer.contact') }}</h2>
      <p>{{ $t('footer.email') }} zust_inter@foxmail.com</p>
      <span>ICP备案： 浙ICP备18023314号-3</span>
    </div>
    <div class="right">
      <img alt="Wechat Mini Program QRCode" src="@/assets/ichstudy.jpg">
      <p>{{ $t('footer.wechat') }}</p>
    </div>
  </div>
</template>

<style scoped lang='less'>
.footer {
  height: 250px;
  background-color: #382321;
  color: #F9F3EB;

  .left {
    margin-right: 30px;
  }

  .right {
    margin-left: 30px;
  }
}

img {
  height: 100px;
  width: 100px;
}
</style>
