<script setup lang='ts'>
import { onMounted, reactive } from 'vue'
import CourseItem from './components/CourseItem.vue'
import { getCourseV } from '@/api/visitor'
import Footer from '@/layouts/components/Footer.vue'

const courseList = reactive({ list: [] })

onMounted(() => {
  getCourseV().then((res) => {
    courseList.list = res.data.endata.data
  })
})
</script>

<template>
  <div class="content flex-column-center">
    <h1>{{ $t('navList.course') }}</h1>
    <div class="list-box">
      <div v-for="(item, i) in courseList.list" :key="i" class="item-box">
        <CourseItem :info="item" />
      </div>
      <i />
      <i />
      <i />
      <i />
    </div>
  </div>
  <Footer />
</template>

<style scoped lang='less'>
.content {
  min-height: 100vh;
  width: 100%;
  padding-top: 60px;

  h1 {
    margin-top: 50px;
  }
}

.list-box {
    width: 70%;
    margin: 20px 15%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;

    .item-box {
      height: 200px;
      width: 300px;
      margin: 20px 0px;
      background-color: #cfcfcf;
    }

    // .item-box:last-child {
    //  margin-right: auto;
    // }
    i {
      width: 300px;
    }
  }
</style>
