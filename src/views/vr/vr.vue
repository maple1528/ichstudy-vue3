<script setup lang='ts'>
import { ElMessage } from 'element-plus'
import Footer from '@/layouts/components/Footer.vue'
import { getFileUrl } from '@/utils/common'
import { getVrV } from '@/api/visitor'

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

const vrList: Ref<Array<IInfo>> = ref([])

const { currentLocale } = useLocale()

const { t } = useI18n()
const { vrNum, setNumber } = useVisitorStore()

const tip = computed(() => {
  return t('errorTips.watchVR')
})

const openVR = (url: string) => {
  const { token } = useUserStore()
  if (token) {
    window.open(url, '_blank')
  } else if (vrNum < 5) {
    setNumber('vr', vrNum + 1)
    window.open(url, '_blank')
  } else {
    ElMessage.error(tip.value)
  }
}

onMounted(async () => {
  const res = await getVrV()
  vrList.value = res.data.endata.data.map((item: IInfo) => {
    item.cover = getFileUrl('img', item.cover)
    return item
  })
})
</script>

<template>
  <div class="f-c-c flex-col pt-12">
    <div class="my-4 text-8">
      {{ $t('navList.vr') }}
    </div>
    <div v-for="(item, index) in vrList" :key="index" class="vr-item">
      <img :src="item.cover">
      <div class="right">
        <h2>{{ currentLocale === 'zh-CN' ? item.vrcnname : item.vrenname }}</h2>
        <p>{{ currentLocale === 'zh-CN' ? item.vrcninfo : item.vreninfo }}</p>
        <button class="btn mt-5 w-60%" @click="openVR(item.vrpath)">
          {{ $t('vr.browser') }}
        </button>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped lang='less'>
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
}
.right {
  width: calc(70% - 300px);
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  p {
    height: 145px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
  }
}
</style>
