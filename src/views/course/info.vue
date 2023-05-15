<script setup lang='ts'>
import { getCourseV, getSectionV } from '@/api/visitor'
import { uploadMy } from '@/api/course'
import router from '@/router'
import { getFileUrl } from '@/utils/common'
import type { IUpload } from '@/api/types'

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
const sectionList: Ref<Array<IInfo>> = ref([])
const currentIndex = ref(0)
const currentUrl = ref('')
const currentSubUrl = ref('')
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
    const info = sectionList.value[currentIndex.value]
    currentUrl.value = getFileUrl('video', info.videopath)
    currentSubUrl.value = getFileUrl('vtt', info.subtitlespath)
  } catch (err) {
  }
}

const getCourseInfo = async () => {
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
  const info = sectionList.value[index]
  currentUrl.value = getFileUrl('video', info.videopath)
}

const back = () => {
  router.go(-1)
}

const sTime: Ref<number> = ref(0)
const eTime: Ref<number> = ref(0)
const deltaTime = ref(0)
const { token } = useUserStore()

const upload = async () => {
  if (!token) {
    return
  }
  if (!sTime.value) {
    return
  }
  if (!eTime.value) {
    eTime.value = new Date().getTime()
  }
  deltaTime.value = Math.ceil((eTime.value - sTime.value) / 60000)

  const params: IUpload = {
    action: '',
    cindex: cid,
    sindex: sectionList.value[currentIndex.value].sindex,
    ctime: deltaTime.value,
  }
  await uploadMy(params)

  sTime.value = eTime.value = deltaTime.value = 0
}

const startPlay = () => {
  if (!sTime.value) {
    sTime.value = new Date().getTime()
  }
}

const endPlay = () => {
  if (!eTime.value) {
    eTime.value = new Date().getTime()
  }
  upload()
}

onMounted(async () => {
  await getSectionList()
  await getCourseInfo()
})

// TODO: 此处仅有路由检测，没有处理直接关闭页面时上传数据
onBeforeRouteLeave(async (to, from, next) => {
  await upload()
  next()
})
</script>

<template>
  <div class="content f-c-c">
    <div class="left">
      <div class="f-c-s mb-5">
        <button class="f-c-c p-1 pl-2 pr-3 rounded-99 back-btn" @click="back()">
          <div i-tabler-chevron-left />
          {{ $t('context.back') }}
        </button>
        <h1 class="title font-600 text-size-6 ml-3">
          {{ title }}
        </h1>
      </div>
      <video
        controls
        :src="currentUrl"
        @play="startPlay"
        @ended="endPlay"
      >
        <source :src="currentUrl" type="video/mp4">
        <track :src="currentSubUrl" kind="subtitles" default>
      </video>
      <p class="info">
        {{ info }}
      </p>
    </div>
    <div class="right">
      <div class="right-title">
        {{ $t('course.list') }}
      </div>
      <ul>
        <li
          v-for="(item, i) in sectionList"
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
  width: 50%;
  height: 80%;

  .info {
    text-align: left;
    max-height: 150px;
    width: 100%;
    overflow: auto;
    margin-top: 30px;
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

  .right-title {
    margin-top: 50px;
  }

  ul {
    width: 100%;
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
