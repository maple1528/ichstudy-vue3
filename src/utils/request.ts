import axios from 'axios'

const request = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_API,
  baseURL: 'https://api.ichstudy.com',
  timeout: 600 * 1000,
})

request.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {}
    if (localStorage.getItem('token'))
      config.headers.token = localStorage.getItem('token') || ''

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response) => {
    const res = response.data.endata
    if (res.msg === 'token已失效' || res.su === 0) {
      // alert(res.message)
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default request
