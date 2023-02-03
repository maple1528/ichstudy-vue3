<script setup lang='ts'>
import { onMounted, reactive } from 'vue'
import { getUserPlayData } from '@/api/user'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
interface IData {
  cscn: string
  csen: string
  ctime: string
  playcounts: number
  sccn: string
  scen: string
}

// const tableH = computed(() => {
//   return document.body.clientHeight
// })
const playData = reactive({ list: [] })

onMounted(() => {
  getUserPlayData(userStore.username)
    .then((res) => {
      playData.list = res.data.endata.data
    })
})
</script>

<template>
  <div>
    <el-table :data="playData.list" height="640px" stripe :header-cell-style="{ background: 'transparent', color: '#382321' }">
      <el-table-column type="index" width="50" />
      <el-table-column :prop="$t('historyTable.propC')" :label="$t('historyTable.course')" />
      <el-table-column :prop="$t('historyTable.propS')" :label="$t('historyTable.section')" />
      <el-table-column prop="ctime" :label="$t('historyTable.time')" />
    </el-table>
  </div>
</template>

<style lang='less'>
.el-table, .el-table__expanded-cell {
    background-color: transparent;
}

.el-table th, .el-table tr {
    background-color: transparent;
}

.el-table__body tr:hover > td{
    background-color: #fff8f1e1 !important;
}

.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
  background: #f9f3eb5d;
}
</style>
