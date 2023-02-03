import router from '@/router'

export function routerPush(url: string) {
  router.push(url)
}

export function getFileUrl(type: string, url: string) {
  return `https://api.ichstudy.com/fstream/?endata={'filetype':'${type}','filename':'${url}'}`
}
