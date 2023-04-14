<script setup lang='ts'>
defineOptions({ name: 'Footer' })
</script>

<template>
  <div class="f-c-c h-60 text-text-dark bg-main-deep dark:bg-main-deep-dark">
    <div class="mr-12">
      <h2>{{ $t('footer.contact') }}</h2>
      <p>{{ $t('footer.email') }}： zust_inter@foxmail.com</p>
      <span>ICP备案： 浙ICP备18023314号-3</span>
    </div>
    <div class="group relative flex flex-row items-center ml-12 cursor-pointer">
      <div class="text-6 mr-2" i-carbon-logo-wechat />
      <p>{{ $t('footer.wechat') }}</p>
      <div class="absolute left-50% bottom-12 h-30 w-30 bg-white p-2 rounded-2 -translate-x-50% invisible opacity-0 transition-all delay-100 group-hover:(visible opacity-100)">
        <span class="before:(content-empty absolute bottom-0 w-0 h-0 b-16 b-b-0 b-transparent b-t-white translate-x-10 translate-y-4)" />
        <img class="object-contain" alt="Wechat Mini Program QRCode" src="@/assets/ichstudy.jpg">
      </div>
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
