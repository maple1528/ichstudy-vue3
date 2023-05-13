<script setup lang='ts'>
import { getTouristList, getTouristSectionList } from '@/api/tourist'
import router from '@/router'
import { getFileUrl } from '@/utils/common'

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

interface ITouristSection {
  data_info: string
  specific_data: string
  surplus: number
  tindex: string
  tsindex: string
}

const { currentLocale } = useLocale()

const route = useRoute()
const tindex = route.params.id as string

const info: Ref<ITouristInfo | undefined> = ref()
const sectionList: Ref<ITouristSection[]> = ref([])

const currentDate: Ref<number> = ref(1)
const currentTime: Ref<number> = ref(-1)

const getTourist = async () => {
  const res = await getTouristList()
  info.value = res.data.endata.data.find((item: ITouristInfo) => item.tindex === tindex)
  if (info.value) {
    info.value.backgroundimg = getFileUrl('img', info.value.backgroundimg)
  }
}

const getSectionList = async () => {
  const res = await getTouristSectionList(tindex)
  sectionList.value = res.data.endata.data
}

const back = () => {
  router.go(-1)
}

const changeDate = (index: number) => {
  currentDate.value = index
}

onMounted(() => {
  getTourist()
  getSectionList()
})
</script>

<template>
  <div class="f-c-c flex-col tourist-info">
    <div class="f-c-s w-70% mb-4">
      <button class="f-c-c p-1 pl-2 pr-3 rounded-99 back-btn" @click="back()">
        <div i-tabler-chevron-left />
        {{ $t('context.back') }}
      </button>
      <div class="font-600 text-size-5 ml-2">
        {{ currentLocale === 'zh-CN' ? info?.cnname : info?.enname }}
      </div>
    </div>
    <div class="content flex w-70% h-75%">
      <div class="left flex-col">
        <div class="left-item">
          <span>{{ $t('tourist.theme') }}</span>
          {{ currentLocale === 'zh-CN' ? info?.cntheme : info?.entheme }}
        </div>
        <div class="left-item">
          <span>{{ $t('tourist.time') }}</span>
          {{ info?.activity_time }}
        </div>
        <div class="left-item">
          <span>{{ $t('tourist.location') }}</span>
          {{ currentLocale === 'zh-CN' ? info?.cnlocation : info?.enlocation }}
        </div>
        <div class="left-item">
          <span>{{ $t('tourist.deadline') }}</span>
          {{ info?.registration_deadline }}
        </div>
        <div class="left-item">
          <span>{{ $t('tourist.content') }}</span>
          {{ currentLocale === 'zh-CN' ? info?.cncontent : info?.encontent }}
        </div>
        <div class="left-item">
          <span>{{ $t('tourist.aim') }}</span>
          {{ currentLocale === 'zh-CN' ? info?.cnaim : info?.enaim }}
        </div>
        <div class="left-item">
          <span>{{ $t('tourist.note') }}</span>
          {{ currentLocale === 'zh-CN' ? info?.cnnote : info?.ennote }}
        </div>
        <img :src="info?.backgroundimg" alt="" class="h-300px object-cover rounded-1 mt-4">
      </div>
      <div class="right">
        <div class="right-card">
          <div class="right-title">
            {{ $t('tourist.visitDate') }}
          </div>
          <div class="right-item">
            <div v-for="(item, i) in sectionList" :key="i">
              <button class="right-item-card" :class="[currentDate === i ? 'choose' : '']" :disabled="item.surplus <= 0" @click="changeDate(i)">
                {{ item.data_info }}
                <div v-show="item.surplus <= 0" class="sold-out">
                  {{ currentLocale === 'zh-CN' ? '售罄' : 'Sold Out' }}
                </div>
              </button>
            </div>
          </div>
        </div>
        <div class="right-card">
          <div class="right-title">
            {{ $t('tourist.visitTime') }}
          </div>
          <div class="right-item">
            <button class="right-item-card time choose">
              13:00 - 16:00
            </button>
          </div>
        </div>
        <button class="btn w-50 my-8">
          {{ $t('tourist.register') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang='less'>
.tourist-info {
  // min-height: 100vh;
  width: 100%;
  padding-top: 100px;
}

.back-btn {
  background-color: #d7d3d0;
  transition: .3s;
}
.back-btn:hover {
  background-color: #c4bfbe;
}
.dark .back-btn {
  background-color: @main-deep-dark;
}
.dark .back-btn:hover {
  background-color: #555555;
}
.left {
  width: 60%;
  .left-item {
    line-height: 28px;
    margin: 5px 0;
  }

  span {
    color: #747474;
    opacity: 0.8;
  }
}

.right {
  height: 100%;
  width: 35%;
  margin-left: 5%;
  padding: 20px;
  background-color: #ffefde;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.right-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.right-title {
  width: calc(100% - 60px);
  margin: 10px 30px;
  text-align: left;
}

.right-item {
  width: 100%;
  display: grid;
  margin-bottom: 10px;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
}

.right-item-card {
  width: 110px;
  padding: 8px 5px;
  margin: 4px;
  background-color: #ffe0c3;
  text-align: center;
  border-radius: 4px;
  border: 2px solid transparent;
  transition: .3s;
  position: relative;

  .sold-out {
    position: absolute;
    right: -8px;
    top: -10px;
    font-size: 10px;
    background-color: #e5e5e5;
    padding: 0 3px;
    border-radius: 4px;
  }
}

.right-item-card.time {
  width: 120px;
}

.right-item-card.choose {
  border-color: @main;
}

.right-item-card:disabled {
  background: #dad4d0;
  cursor: not-allowed;
}

.dark {
  .right {
    background-color: @main-deep-dark;
  }

  .right-item-card {
    background-color: #656565;
  }

  .sold-out {
    background-color: #9d9d9d;
  }

  .right-item-card:disabled {
    background: #9d9d9d;
  }
}
</style>
