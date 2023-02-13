<script setup lang='ts'>
import { computed, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import Footer from '@/layouts/components/Footer.vue'
import { getFileUrl } from '@/utils/common'
import { getVrV } from '@/api/visitor'
import useLocale from '@/hook/useLocale'

const vrList = reactive({ list: [] as IInfo[] })
const { t } = useI18n()

const { currentLocale } = useLocale()
const tip = computed(() => {
  return t('errorTips.watchVR')
})

interface IInfo {
  cover: string
  vr_panoramic_cover: string
  vrcninfo: string
  vrcnname: string
  vreninfo: string
  vrenname: string
  vrpath: string
  id: number
}

onMounted(() => {
  getVrV().then((res) => {
    vrList.list = res.data.endata.data.map((item: IInfo) => {
      item.cover = getFileUrl('img', item.cover)
      return item
    })
  })
})

const openVR = (url: string) => {
  const time = Number(localStorage.getItem('vrNum') || 0)
  if (localStorage.getItem('token')) {
    window.open(url, '_blank')
  } else if (time < 5) {
    localStorage.setItem('vrNum', String(time + 1))
    window.open(url, '_blank')
  } else {
    ElMessage.error(tip.value)
  }
}
</script>

<template>
  <div class="content">
    <h1>{{ $t('navList.vr') }}</h1>
    <div v-for="(item, index) in vrList.list" :key="index" class="vr-item">
      <img :src="item.cover">
      <div class="right">
        <h2>{{ currentLocale === 'zh-CN' ? item.vrcnname : item.vrenname }}</h2>
        <p>{{ currentLocale === 'zh-CN' ? item.vrcninfo : item.vreninfo }}</p>
        <button class="btn" @click="openVR(item.vrpath)">
          {{ $t('vr.browser') }}
        </button>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped lang='less'>
.content {
  min-height: 100vh;
  width: 100%;
  padding-top: 60px;

  h1 {
    margin-top: 50px;
  }
}

.vr-item {
  width: 70%;
  margin: 40px 15%;
  display: flex;
  flex-direction: row;

  img {
    height: 300px;
    width: 500px;
    margin-right: 40px;
    object-fit: cover;
    border-radius: 10px;
  }

  .right {
    width: calc(70% - 300px);
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      height: 145px;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
    }

    button {
      width: 60%;
      margin-top: 20px;
    }
  }
}
</style>
