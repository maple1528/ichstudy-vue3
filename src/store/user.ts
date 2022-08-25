import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      username: 'uuu'
    }
  },
  getters: {
  },
  actions: {
  }
})
