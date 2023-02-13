import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { getUserInfo } from '@/api/user'

const tokenRef = useStorage<string | undefined>('token', undefined, localStorage)

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: tokenRef,
      username: '',
      phone: null,
    }
  },
  getters: {
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    async getInfo() {
      try {
        const { data } = await getUserInfo()
        this.username = data.endata.data.username
        this.phone = data.endata.data.phone
      } catch (error) {
        this.token = undefined
      }
    },
    logout() {
      this.token = undefined
    },
  },
})
