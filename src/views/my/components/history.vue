<script setup lang='ts'>
import { getUserPlayData } from '@/api/user'

interface IData {
  cscn: string
  csen: string
  ctime: string
  playcounts: number
  sccn: string
  scen: string
}

const userStore = useUserStore()

// const tableH = computed(() => {
//   return document.body.clientHeight
// })

const playData: Ref<IData[]> = ref([])

onMounted(() => {
  getUserPlayData(userStore.username)
    .then((res) => {
      playData.value = res.data.endata.data
    })
})
</script>

<template>
  <div>
    <ElTable :data="playData" height="640px" stripe :header-cell-style="{ background: 'transparent' }">
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

.dark {
  .el-table__body tr:hover > td{
    background-color: #858585e1 !important;
  }

  .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
    background: #7171715d;
  }
}
</style>
