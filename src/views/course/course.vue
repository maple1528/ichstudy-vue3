<script setup lang='ts'>
import { onMounted, reactive } from 'vue'
import CourseItem from './components/CourseItem.vue'
import Footer from '@/layouts/components/Footer.vue'
import { getCourseV } from '@/api/visitor'

defineOptions({ name: 'Course' })

const courseList = reactive({ list: [] })

onMounted(async () => {
  const res = await getCourseV()
  courseList.list = res.data.endata.data
})
</script>

<template>
  <div class="flex-col pt-12">
    <h1>{{ $t('navList.course') }}</h1>
    <div class="grid grid-cols-3">
      <div
        v-for="(item, i) in courseList.list"
        :key="i"
        class="w-xs h-52 my-16"
      >
        <CourseItem :info="item" />
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped lang='less'>
.content {
  min-height: 100vh;
  width: 100%;
  padding-top: 60px;
}

.list-box {
    // width: 70%;
    // margin: 20px 15%;
    // display: flex;
    // flex-direction: row;
    // justify-content: space-between;
    // flex-wrap: wrap;

    .item-box {
      height: 200px;
      width: 300px;
      margin: 20px 0px;
      background-color: #cfcfcf;
    }
  }
</style>
