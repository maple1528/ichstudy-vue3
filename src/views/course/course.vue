<template>
  <div class="content flex-column-center">
    <h1>{{ $t('navList.course') }}</h1>
    <div class="list-box">
      <div class="item-box" v-for="(item, i) in courseList.list">
        <CourseItem :info="item"></CourseItem>
      </div>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup lang='ts'>
import { onMounted, reactive } from 'vue'
import { getCourseV } from '@/api/visitor'
import CourseItem from './components/CourseItem.vue'
import Footer from '@/layouts/components/Footer.vue';

const courseList = reactive({list: []})

onMounted(() => {
  getCourseV().then(res => {
    courseList.list = res.data.endata.data
  })
})


</script>

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
