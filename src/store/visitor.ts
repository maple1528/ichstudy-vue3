import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

const courseNumRef = useStorage<number>('courseNum', 0, localStorage)
const vrNumRef = useStorage<number>('vrNum', 0, localStorage)

export const useVisitorStore = defineStore('visitor', {
  state: () => {
    return {
      courseNum: courseNumRef,
      vrNum: vrNumRef,
    }
  },
  actions: {
    setNumber(type: string, num: number) {
      if (type === 'course') {
        this.courseNum = num
      } else if (type === 'vr') {
        this.vrNum = num
      }
    },
  },
})
