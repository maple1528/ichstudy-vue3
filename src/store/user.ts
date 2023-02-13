import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: localStorage.getItem('token') || '',
      username: '',
      phone: null,
    }
  },
  getters: {
  },
  actions: {
    setToken(token: string) {
      localStorage.setItem('token', token)
      this.token = token
    },
    async getInfo() {
      try {
        const { data } = await getUserInfo()
        this.username = data.endata.data.username
        this.phone = data.endata.data.phone
      } catch (error) {
        localStorage.removeItem('token')
        this.token = ''
      }
    },
    logout() {
      localStorage.removeItem('token')
      this.token = ''
    },
  },
})
