<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import CourseItem from './components/CourseItem.vue'
import Footer from '@/layouts/components/Footer.vue'
import { getCourseV } from '@/api/visitor'

defineOptions({ name: 'Course' })

const courseList = ref([])

onMounted(async () => {
  const res = await getCourseV()
  courseList.value = res.data.endata.data
})
</script>

<template>
  <div class="f-c-c flex-col pt-12">
    <div class="my-4 text-8">
      {{ $t('navList.course') }}
    </div>
    <div class="grid grid-cols-3">
      <div
        v-for="(item, i) in courseList"
        :key="i"
        class="w-xs h-52 m-6"
      >
        <CourseItem :info="item" />
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
</style>
