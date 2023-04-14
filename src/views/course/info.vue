<script setup lang='ts'>
import { getCourseV, getSectionV } from '@/api/visitor'
import { getFileUrl } from '@/utils/common'

// import "vue3-video-play/dist/style.css";
// import { videoPlay } from "vue-video-play";

interface IInfo {
  cindex: string
  cnname: string
  enname: string
  sindex: string
  status: number
  subtitlespath: string
  videopath: string
  vidfortx: string
}

const { currentLocale } = useLocale()
const route = useRoute()
const cid = route.params.id as string
// const sectionList = reactive({list: [] as IInfo[]})
const sectionList = ref([])
const sectionTitleList = reactive({ list: [] as IInfo[] })
const currentIndex = ref(0)
const currentUrl = ref('')
const cnTitle = ref('')
const enTitle = ref('')
const cnInfo = ref('')
const enInfo = ref('')

const title = computed(() => {
  if (currentLocale.value === 'zh-CN') {
    return cnTitle.value
  } else {
    return enTitle.value
  }
})

const info = computed(() => {
  if (currentLocale.value === 'zh-CN') {
    return cnInfo.value
  } else {
    return enInfo.value
  }
})

const getSectionList = async () => {
  try {
    const { data } = await getSectionV(cid)
    sectionList.value = data.endata.data
    const info = sectionList.value[currentIndex.value] as IInfo
    currentUrl.value = getFileUrl('video', info.videopath)

    sectionList.value.forEach((item) => {
      const i = item as IInfo
      sectionTitleList.list.push(i)
    })
  } catch (err) {
  }
}

const getCourseInfo = async () => {
  await getSectionList()
  try {
    const { data } = await getCourseV()
    const arr = data.endata.data
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].cindex === cid) {
        cnTitle.value = arr[i].cnname
        enTitle.value = arr[i].enname
        cnInfo.value = arr[i].cninfo
        enInfo.value = arr[i].eninfo
        return
      }
    }
  } catch (err) {

  }
}

const changeVideo = (index: number) => {
  currentIndex.value = index
  const info = sectionList.value[index] as IInfo
  currentUrl.value = getFileUrl('video', info.videopath)
}

onMounted(() => {
  // getSectionList()
  getCourseInfo()
})
</script>

<template>
  <div class="content flex-center-item">
    <div class="left">
      <h1 class="title">
        {{ title }}
      </h1>
      <video
        controls
        :src="currentUrl"
      >
        <source :src="currentUrl" type="video/mp4">
        <!-- <track :src="currentSubUrl" kind="subtitles" default> -->
      </video>
      <p class="info">
        {{ info }}
      </p>
    </div>
    <div class="right">
      <ul>
        <li
          v-for="(item, i) in sectionTitleList.list"
          :key="i"
          :class="{ active: currentIndex === i }"
          @click="changeVideo(i)"
        >
          {{ currentLocale === 'zh-CN' ? item.cnname : item.enname }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang='less'>
.content {
  height: 100vh;
  width: 100%;
  // padding-top: 60px;
}

video {
  width: 100%;
  height: auto;
  margin: auto;
}

.left {
  width: 50%;
  height: 80%;

  .info {
    text-align: left;
    max-height: 150px;
    width: 100%;
    overflow: auto;
  }

  .info::-webkit-scrollbar {/*滚动条整体样式*/
    width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 0px;
  }
  .info::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
    background: #9e9e9e;
  }
  .info::-webkit-scrollbar-track {/*滚动条里面轨道*/
    border-radius: 10px;
    background: #e2e2e2;
  }
}

.right {
  margin-left: 40px;
  width: 250px;
  height: 80%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  ul {
    width: 100%;
    margin-top: 70px;
    padding: 0;
    list-style: none;

    li {
      // height: 40px;
      // line-height: 40px;
      border-radius: 3px;
      margin: 5px;
      padding: 8px 10px;
      cursor: pointer;
      transition: .3s;
    }

    .active, li:hover {
      background-color: #73615d;
      color: #ffffff;
    }
  }
}
</style>
