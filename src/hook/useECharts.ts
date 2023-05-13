// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 系列类型的定义后缀都为 SeriesOption
import type {
  BarSeriesOption,
  PieSeriesOption,
} from 'echarts/charts'
// 组件类型的定义后缀都为 ComponentOption
import type {
  DatasetComponentOption,
  GridComponentOption,
  TitleComponentOption,
  TooltipComponentOption,
} from 'echarts/components'
// 按需引入图表
import {
  BarChart,
  PieChart,
} from 'echarts/charts'
// 引入组件
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent,
} from 'echarts/components'
// 使用svg渲染器
import { SVGRenderer } from 'echarts/renderers'
import { isDark } from '@/composables/dark'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>

// 注册组件
echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  PieChart,
  SVGRenderer,
])

const useECharts = () => {
  let chartInstance: echarts.ECharts | null = null

  const setOption = (option: ECOption) => {
    chartInstance?.setOption(option)
  }

  const resize = () => {
    chartInstance?.resize()
  }

  const init = (elRef: HTMLElement) => {
    chartInstance = echarts.init(elRef, isDark.value ? 'dark' : 'light')
    window.addEventListener('resize', resize)
  }

  const destroy = () => {
    chartInstance?.dispose()
    window.removeEventListener('resize', resize)
    chartInstance = null
  }

  return {
    setOption,
    resize,
    init,
    destroy,
  }
}

export default useECharts
