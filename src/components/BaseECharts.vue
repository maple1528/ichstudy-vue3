<script lang="ts" setup>
import type { ECOption } from '@/hook/useECharts'
import { isDark } from '@/composables/dark'

interface Props {
  width?: string
  height?: string
  options: ECOption
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '100%',
  options: () => ({}),
})

const { currentLocale } = useLocale()

const { init, setOption, destroy } = useECharts()

const chartRef = ref<HTMLDivElement | null>(null)

// TODO: 此处有点问题，切换语言和颜色模式后会消失
watch([isDark, currentLocale], () => {
  // if (chartRef.value !== null) {
  //   destroy()
  //   init(chartRef.value)
  // }
})

onMounted(() => {
  if (chartRef.value !== null) {
    init(chartRef.value)
  }
  watchEffect(() => {
    setOption(props.options)
  })
})

onUnmounted(() => {
  destroy()
})
</script>

<template>
  <div ref="chartRef" :style="{ width, height }" />
</template>
