import axios from 'axios'
import { useUserStore } from '@/store/user'

const request = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_API,
  baseURL: 'https://api.ichstudy.com',
  timeout: 600 * 1000,
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const user = useUserStore()
    config.headers = config.headers ?? {}
    if (user.token) {
      config.headers.token = user.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const res = response.data.endata
    if (res.msg === 'token已失效' || res.su === 0) {
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default request

export async function post<T>(url: string, data?: T) {
  return await request({
    url,
    method: 'POST',
    data: {
      endata: data ?? {},
    },
  })
}

export async function get<T>(url: string, data?: T) {
  return await request({
    url,
    method: 'GET',
    data,
  })
}
