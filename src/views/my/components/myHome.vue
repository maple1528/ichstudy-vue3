<script setup lang='ts'>
import type { ECOption } from '@/hook/useECharts'
import { getUserPlayData } from '@/api/user'
import BaseECharts from '@/components/BaseECharts.vue'

interface IData {
  cscn: string
  csen: string
  ctime: string
  playcounts: number
  sccn: string
  scen: string
}

interface IPieData {
  value: number
  name: string
}

const userStore = useUserStore()
const { currentLocale } = useLocale()

// let playData = reactive({})
const totalTime = ref(0)
const totalNum = ref(0)
const mTitleCN = ref('')
const mTitleEN = ref('')
const mNum = ref(0)
const coursePlayData: Ref<IData[]> = ref([])

const point = computed(() => {
  // TODO: 积分系统需要完善
  // 目前设想：看完一个视频计一分
  // 此处简单计算了一下，每看十分钟计一分
  return Math.floor(totalTime.value / 10)
})

const totalTimeText = computed(() => {
  const hour = Math.floor(totalTime.value / 60)
  const min = Math.floor(totalTime.value - hour * 60)
  if (currentLocale.value === 'zh-CN') {
    return `${hour} 时 ${min} 分`
  } else {
    return `${hour} H ${min} M`
  }
})

const mTitle = computed(() => {
  if (currentLocale.value === 'zh-CN') {
    return mTitleCN
  } else {
    return mTitleEN
  }
})

const numPlayData = computed(() => {
  let data = []
  if (currentLocale.value === 'zh-CN') {
    data = coursePlayData.value.map((item) => {
      return {
        value: item.playcounts,
        name: item.cscn,
      }
    })
  } else {
    data = coursePlayData.value.map((item) => {
      return {
        value: item.playcounts,
        name: item.csen,
      }
    })
  }
  return data.sort((a, b) => b.value - a.value)
})

const timePlayData = computed(() => {
  let data = []
  if (currentLocale.value === 'zh-CN') {
    data = coursePlayData.value.map((item) => {
      return {
        value: parseInt(item.ctime),
        name: item.cscn,
      }
    })
  } else {
    data = coursePlayData.value.map((item) => {
      return {
        value: parseInt(item.ctime),
        name: item.csen,
      }
    })
  }
  return data.sort((a, b) => b.value - a.value)
})

const numOption: Ref<ECOption> = ref({})
const timeOption: Ref<ECOption> = ref({})

const initECharts = (playData: IPieData[], option: Ref<ECOption>) => {
  let data: IPieData[] = []
  if (playData.length > 10) {
    data = playData.slice(0, 10)
    const sum = playData.slice(11).reduce((total, current) => {
      return total + current.value
    }, 0)
    data.push({
      value: sum,
      name: currentLocale.value === 'zh-CN' ? '其他' : 'other',
    })
  }
  option.value = {
    backgroundColor: '',
    tooltip: {},
    series: [
      {
        type: 'pie',
        data,
        radius: ['10%', '60%'],
        itemStyle: {
          borderWidth: 3,
          // borderColor: '#ffffff',
          borderRadius: 5,
        },
      },
    ],
  }
}

onMounted(async () => {
  const res = await getUserPlayData(userStore.username)
  const data: IData[] = res.data.endata.data
  data.sort((a, b) => {
    if (a.csen > b.csen) {
      return 1
    } else if (a.csen < b.csen) {
      return -1
    } else {
      return 0
    }
  })
  coursePlayData.value.push(data[0])
  let courseIndex = 0
  for (let i = 1; i < data.length; i++) {
    if (data[i].csen === data[i - 1].csen) {
      coursePlayData.value[courseIndex].playcounts += data[i].playcounts
      coursePlayData.value[courseIndex].ctime = (parseInt(coursePlayData.value[courseIndex].ctime) + parseInt(data[i].ctime)).toString()
    } else {
      courseIndex++
      coursePlayData.value.push(data[i])
    }
  }
  for (const item of data) {
    totalNum.value += item.playcounts
    totalTime.value += parseInt(item.ctime)
    if (item.playcounts > mNum.value) {
      mNum.value = item.playcounts
      mTitleCN.value = item.sccn
      mTitleEN.value = item.scen
    }
  }
  initECharts(numPlayData.value, numOption)
  initECharts(timePlayData.value, timeOption)
})
</script>

<template>
  <div class="my-home">
    <div class="home-title">
      {{ $t('myHomeText.title') }}
    </div>
    <!-- <div class="point">
      <div class="title">
        {{ $t('myHomeText.point') }}
      </div>
      <div class="num">
        {{ point }}
      </div>
    </div> -->
    <div class="charts">
      <div class="charts-card">
        <div class="card-title">
          <div class="title-left">
            <!-- <div i-tabler-clock-filled /> -->
            <div i-tabler-clock-hour-4 />
          </div>
          <div class="title-right">
            <div class="title">
              {{ $t('myHomeText.totalTime') }}
            </div>
            <div class="num">
              {{ totalTimeText }}
            </div>
          </div>
        </div>
        <BaseECharts height="400px" :options="numOption" />
      </div>
      <div class="charts-card">
        <div class="card-title">
          <div class="title-left">
            <div i-tabler-versions />
          </div>
          <div class="title-right">
            <div class="title">
              {{ $t('myHomeText.totalNum') }}
            </div>
            <div class="num">
              {{ totalNum }}
            </div>
          </div>
        </div>
        <BaseECharts height="400px" :options="timeOption" />
      </div>
    </div>
  </div>
</template>

<style scoped lang='less'>
.my-home {
  display: flex;
  flex-direction: column;
}

.home-title {
  margin: 10px;
  font-size: 24px;
  font-weight: bold;
}
.charts {
  display: flex;
  justify-content: space-between;
}

.charts-card {
  width: 50%;
}

.card-title {
  margin: 10px;
  padding: 0 10px;
  height: 90px;
  background-color: #ffffff78;
  border-radius: 8px;
  display: flex;
  align-items: center;
}

.dark .card-title {
  background-color: #ffffff33;
}

.title-left {
  font-size: 50px;
  margin-right: 10px;
  color: @main;
}

.title-right {
  line-height: 36px;

  .title {
    font-weight: bold;
  }
}
</style>
