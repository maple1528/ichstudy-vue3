import request from '@/utils/request'

// 获取课程 游客模式
export const getCourseV = () => {
  return request({
    url: '/course/visitor/getcourse/',
    method: 'POST',
    data: {
      endata: {}
    }
  })
}

// 获取章节 游客模式
export const getSectionV = (cindex: string) => {
  return request({
    url: '/course/visitor/getsection/',
    method: 'POST',
    data: {
      endata: {
        cindex
      }
    }
  })
}

// 获取vr 游客模式
export const getVrV = () => {
  return request({
    url: '/vr/visitor/',
    method: 'POST',
    data: {
      endata: {}
    }
  })
}
