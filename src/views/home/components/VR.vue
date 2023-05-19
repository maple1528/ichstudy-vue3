<script setup lang='ts'>
import { ElMessage } from 'element-plus'
import { routerPush } from '@/utils/common'

const { currentLocale } = useLocale()

interface IData {
  url: string
  imgUrl: string
  cnTitle: string
  enTitle: string
  cnInfo?: string
  enInfo?: string
}

const list: Ref<Array<IData>> = ref([])

list.value = [
  {
    url: 'https://vr.ichstudy.com/jnbwg',
    imgUrl: 'https://api.ichstudy.com/fstream/?endata={\'filetype\':\'img\',\'filename\':\'vr/jn.png\'}',
    cnTitle: '中国畲族博物馆',
    enTitle: 'China She Nationality Museum',
  },
  {
    url: 'https://vr.ichstudy.com/longzhutan',
    imgUrl: 'https://api.ichstudy.com/fstream/?endata={\'filetype\':\'img\',\'filename\':\'vr/lz.png\'}',
    cnTitle: '龙珠',
    enTitle: 'Longzhu',
  },
  {
    url: 'https://vr.ichstudy.com/dinghai',
    imgUrl: 'https://api.ichstudy.com/fstream/?endata={\'filetype\':\'img\',\'filename\':\'vr/dhgc.png\'}',
    cnTitle: '定海古城',
    enTitle: 'Dinghai Ancient City',
  },
]

let timer: number | undefined
const index = ref(0)

const autoPlay = () => {
  clearInterval(timer)
  timer = setInterval(() => {
    index.value++
    if (index.value >= list.value.length) {
      index.value = 0
    }
  }, 1500)
}

const changeIndex = (newIndex: number) => {
  clearInterval(timer)
  index.value = newIndex
}

const { t } = useI18n()
const { vrNum, setNumber } = useVisitorStore()

const tip = computed(() => {
  return t('errorTips.watchCourse')
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

onMounted(() => {
  autoPlay()
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="content">
    <div class="left">
      <div
        v-for="(item, i) in list" :key="i"
        class="card" :class="index === i ? 'choose' : ''"
        @mouseover="changeIndex(i)" @mouseleave="autoPlay"
      >
        <img :src="item.imgUrl" alt="img">
        <div class="card-info">
          <div class="title">
            {{ currentLocale === 'zh-CN' ? item.cnTitle : item.enTitle }}
          </div>
          <button class="toInfo" @click="openVR(item.url)">
            <div class="i-tabler-arrow-big-right-filled" />
          </button>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="index">
        02
      </div>
      <div class="title">
        {{ $t('navList.vr') }}
      </div>
      <button class="more btn" @click="routerPush('/vr')">
        {{ $t('context.more') }}
      </button>
      <div class="divided" />
    </div>
  </div>
</template>

<style scoped lang='less'>
.content {
  height: 100vh;
  width: 100%;
  padding: 80px 50px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 120px;
  position: relative;
  margin-left: 40px;

  .index {
    font-weight: bold;
    font-size: 80px;
    font-family: Montserrat;
  }

  .title {
    font-weight: bold;
    font-size: 30px;
  }

  .more {
    margin-top: 20px;
    width: 100%;
  }

  .divided {
    position: absolute;
    left: -30px;
    top: 24px;
    height: 210px;
    width: 10px;
    background-color: @main;
  }
}

.left {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
}

.card {
  width: 225px;
  height: 80%;
  margin: 10px;
  position: relative;
  transition: .3s;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
}

.choose {
  width: 475px;
}

.card-info {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  transition: .3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;

  .title {
    text-align: center;
    background: @main;
    padding: 6px 15px;
    border-radius: 2px;
    margin-bottom: 20px;
  }

  .toInfo {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.dark .toInfo {
  background: @main-deep-dark;
}

.card:hover .card-info {
  opacity: 1;
}
</style>
