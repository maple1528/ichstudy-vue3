<script setup lang='ts'>
import { ElMessage } from 'element-plus'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getFileUrl, routerPush } from '@/utils/common'
const props = defineProps<{ info: IInfo }>()

const { t } = useI18n()

const tip = computed(() => {
  return t('errorTips.watchCourse')
})
interface IInfo {
  cindex: string
  cninfo: string
  cnname: string
  eninfo: string
  enname: string
  imgpath: string
  playcounts: number
  status: number
}

const imgUrl = getFileUrl('img', props.info.imgpath)
const routerUrl = `/course/${props.info.cindex}`

const title = ref()

onMounted(() => {
  if (localStorage.getItem('locale') === 'zh-CN')
    title.value = props.info.cnname
  else
    title.value = props.info.enname
})

const toVideo = () => {
  const time = Number(localStorage.getItem('courseNum') || 0)
  if (localStorage.getItem('token')) {
    routerPush(routerUrl)
  }
  else if (time < 5) {
    localStorage.setItem('courseNum', String(time + 1))
    routerPush(routerUrl)
  }
  else {
    ElMessage.error(tip.value)
  }
}
</script>

<template>
  <div class="img-box" @click="toVideo">
    <img :src="imgUrl" alt="img">
    <div class="cover">
      <div class="title">
        {{ title }}
      </div>
      <div class="more">
        {{ $t('context.watch') }}
      </div>
    </div>
  </div>
</template>

<style scoped lang='less'>
.img-box {
  height: 100%;
  width: 100%;
  position: relative;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .cover {
    height: calc(100% + 10px);
    width: calc(100% + 10px);
    background-color: #0000009c;
    backdrop-filter: blur(10px);
    color: #FFFFFF;
    position: absolute;
    top: -5px;
    left: -5px;
    opacity: 0;
    transition: .3s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      font-size: 20px;
      // letter-spacing: 2pt;
      word-spacing: 2px;
      font-weight: bold;
      position: relative;
      margin-bottom: 20px;
    }

    .more {
      height: 40px;
      width: 50%;
      text-align: center;
      line-height: 40px;
      background-color: #73615D;
    }
  }
}

.img-box:hover .cover {
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  opacity: 1;
  cursor: pointer;
}
</style>
