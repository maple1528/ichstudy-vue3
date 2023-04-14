<script setup lang='ts'>
import { getUserPlayData } from '@/api/user'

const userStore = useUserStore()
interface IData {
  cscn: string
  csen: string
  ctime: string
  playcounts: number
  sccn: string
  scen: string
}

// let playData = reactive({})
const totalTime = ref(0)
const totalNum = ref(0)
const mCnTitle = ref('')
const mEnTitle = ref('')
const mNum = ref(0)

const point = computed(() => {
  return Math.floor(totalTime.value / 10)
})
const totalTimeText = computed(() => {
  const hour = Math.floor(totalTime.value / 60)
  const min = Math.floor(totalTime.value - hour * 60)
  if (localStorage.getItem('locale') === 'zh-CN') {
    return `${hour} 时 ${min} 分`
  } else {
    return `${hour} H ${min} M`
  }
})
const mTitle = computed(() => {
  if (localStorage.getItem('locale') === 'zh-CN') {
    return mCnTitle
  } else {
    return mEnTitle
  }
})

onMounted(() => {
  getUserPlayData(userStore.username)
    .then((res) => {
      const playData: IData[] = res.data.endata.data
      playData.forEach((item) => {
        totalNum.value += item.playcounts
        totalTime.value += parseInt(item.ctime)
        if (item.playcounts > mNum.value) {
          mNum.value = item.playcounts
          mCnTitle.value = item.sccn
          mEnTitle.value = item.scen
        }
      })
    })
})
</script>

<template>
  <div class="my-home flex-column-center">
    <h1 class="left-title">
      {{ $t('myHomeText.title') }}
    </h1>
    <div class="top-box flex-between-center">
      <div class="c-box">
        <h3 class="title">
          {{ $t('myHomeText.point') }}
        </h3>
        <div class="num">
          {{ point }}
        </div>
      </div>
      <div class="c-box">
        <h3 class="title">
          {{ $t('myHomeText.totalTime') }}
        </h3>
        <div class="num">
          {{ totalTimeText }}
        </div>
      </div>
      <div class="c-box">
        <h3 class="title">
          {{ $t('myHomeText.totalNum') }}
        </h3>
        <div class="num">
          {{ totalNum }}
        </div>
      </div>
    </div>
    <div class="separate" />
    <div class="bot-box">
      <h3 class="left-title">
        {{ $t('myHomeText.mostVideo') }}
      </h3>
      <div class="v-list flex-between-center">
        <div class="v-title">
          {{ mTitle }}
        </div>
        <div class="v-num">
          {{ mNum }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='less'>
.my-home {
  height: 600px;
  width: 100%;
  // padding: 0 20px;
}

h1 {
  width: 80%;
}

.top-box {
  width: 80%;
}

.c-box {
  height: 100px;
  width: 30%;
  // background-color: #fd8f00;
}

.separate {
  height: 2px;
  width: 80%;
  background-color: #fff;
  margin: 30px;
}

.bot-box {
  height: 150px;
  width: 80%;
  // background-color: #fff;

}
.left-title {
  text-align: left;
}
</style>
