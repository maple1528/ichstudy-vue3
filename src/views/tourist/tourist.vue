<script setup lang='ts'>
import { ElMessage } from 'element-plus'
import Footer from '@/layouts/components/Footer.vue'
import { getTouristList } from '@/api/tourist'
import { getFileUrl, routerPush } from '@/utils/common'

interface ITouristInfo {
  activity_time: string
  backgroundimg: string
  coverimg: string
  limits: number
  price: number
  registration_deadline: string
  tindex: string
  trip_cninfo: string
  trip_eninfo: string
  type: string
  cnaim: string
  cncontent: string
  cnlocation: string
  cnname: string
  cnnote: string
  cntheme: string
  enaim: string
  encontent: string
  enlocation: string
  enname: string
  ennote: string
  entheme: string
}

const touristList: Ref<Array<ITouristInfo>> = ref([])

const { currentLocale } = useLocale()

const { t } = useI18n()

const tip = computed(() => {
  return t('errorTips.watchTourist')
})

const toDetail = (tindex: string) => {
  const { token } = useUserStore()
  if (!token) {
    ElMessage.error(tip.value)
    return
  }
  routerPush(`/tourist/${tindex}`)
}

onMounted(async () => {
  const res = await getTouristList()
  touristList.value = res.data.endata?.data
  touristList.value.forEach((item) => {
    item.coverimg = getFileUrl('img', item.coverimg)
  })
})
</script>

<template>
  <div class="flex-col items-center pt-12 min-h-100vh">
    <div class="my-4 text-8">
      {{ $t('navList.tourist') }}
    </div>
    <div v-for="(item, i) in touristList" :key="i" class="tourist-item">
      <img :src="item.coverimg" alt="img">
      <div class="flex-col">
        <div class="text-5 font-bold">
          {{ currentLocale === 'zh-CN' ? item.cnname : item.enname }}
        </div>
        <div class="my-4">
          {{ currentLocale === 'zh-CN' ? item.cncontent : item.encontent }}
        </div>
        <div class="flex items-center">
          <div i-tabler-clock-hour-4 />
          <div>
            {{ item.activity_time }}
          </div>
        </div>
        <div class="flex items-center">
          <div i-tabler-map-pin />
          <div>
            {{ currentLocale === 'zh-CN' ? item.cnlocation : item.enlocation }}
          </div>
        </div>
        <button class="btn mt-8 w-200px" @click="toDetail(item.tindex)">
          {{ t('tourist.detail') }}
        </button>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped lang='less'>
.tourist-item {
  width: 60%;
  margin: 40px 0;
  display: flex;
  flex-direction: row;

  img {
    height: 300px;
    width: 300px;
    margin-right: 60px;
    object-fit: cover;
    border-radius: 10px;
  }
}
</style>
