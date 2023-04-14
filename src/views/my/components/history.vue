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
    <ElTable :data="playData.list" height="640px" stripe :header-cell-style="{ background: 'transparent', color: '#382321' }">
      <ElTableColumn type="index" width="50" />
      <ElTableColumn :prop="$t('historyTable.propC')" :label="$t('historyTable.course')" />
      <ElTableColumn :prop="$t('historyTable.propS')" :label="$t('historyTable.section')" />
      <ElTableColumn prop="ctime" :label="$t('historyTable.time')" />
    </ElTable>
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
