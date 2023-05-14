<script setup lang='ts'>
import { ElMessage } from 'element-plus'
import { routerPush } from '@/utils/common'

const { currentLocale } = useLocale()

interface IData {
  cindex: string
  imgUrl: string
  cnTitle: string
  enTitle: string
  cnInfo?: string
  enInfo?: string
}

const list: Ref<Array<IData>> = ref([])

list.value = [
  {
    cindex: 'zsyh',
    imgUrl: 'https://api.ichstudy.com/fstream/?endata={\'filetype\':\'img\',\'filename\':\'zsyh/zsyh.png\'}',
    cnTitle: '舟山海洋文化',
    enTitle: 'Zhoushan',
    cnInfo: '舟山人因海而生、因海而兴，在漫长的历史长河中，在长期的生产、生活中创造了独具特色的舟山海洋文化。',
    enInfo: 'Zhoushan people were born and prospered because of the sea. In the long history, in the long production and life, Zhoushan people created a unique Zhoushan marine culture.',
  },
  {
    cindex: 'mr',
    imgUrl: 'https://api.ichstudy.com/fstream/?endata={\'filetype\':\'img\',\'filename\':\'mr/Snipaste_2022-05-19_15-15-37.png\'}',
    cnTitle: '苗染',
    enTitle: 'Miao ran',
    cnInfo: '苗染作为苗族手工艺品的重要组成部分，承载着太多先人所给予的厚望，每一张染布，每一次印染都蕴含着深刻的含义。',
    enInfo: 'As an important part of Miao people\'s dyeing, each piece of Miao people\'s dyeing contains too much meaning.',
  },
  {
    cindex: 'sj',
    imgUrl: 'https://api.ichstudy.com/fstream/?endata={\'filetype\':\'img\',\'filename\':\'sj/sj.png\'}',
    cnTitle: '畲间',
    enTitle: 'A Way to Get to Know Shanha',
    cnInfo: '本片借“云鹤水岸”这一极具畲族特色的乡间民宿，引起人们对于畲族这个民族的认识兴趣，呼吁人们重视畲族正在消失的文化。',
    enInfo: 'his film uses "Yunhe Shuian", a rural home stay with the characteristics of the She nationality, to arouse people\'s interest in the understanding of the She nationality and call on people to pay attention to the disappearing culture of the She nationality.',
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
const { token } = useUserStore()
const { courseNum, setNumber } = useVisitorStore()

const tip = computed(() => {
  return t('errorTips.watchCourse')
})

const toVideo = (cindex: string) => {
  const routerUrl = `/course/${cindex}`

  if (token) {
    routerPush(routerUrl)
  } else if (courseNum < 5) {
    setNumber('course', courseNum + 1)
    routerPush(routerUrl)
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
      <div class="index">
        01
      </div>
      <div class="title">
        {{ $t('navList.course') }}
      </div>
      <button class="more btn" @click="routerPush('/course')">
        {{ $t('context.more') }}
      </button>
      <div class="divided" />
    </div>
    <div class="right">
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
          <button class="toInfo" @click="toVideo(item.cindex)">
            <div class="i-tabler-arrow-big-right-filled" />
          </button>
        </div>
      </div>
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

.left {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 120px;
  position: relative;
  margin-right: 40px;

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
    right: -30px;
    top: 24px;
    height: 210px;
    width: 10px;
    background-color: @main;
  }
}

.right {
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
