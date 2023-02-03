import request from '@/utils/request'
import type { IMailBind, IMailVerify, ISMSBind, ISMSVerify, IUser } from '@/api/types'

// 登录
export const login = (data: IUser) => {
  return request({
    url: '/login/',
    method: 'POST',
    data: {
      endata: data,
    },
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/user',
    method: 'POST',
    data: {
      endata: {
        action: 'logout',
      },
    },
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/user',
    method: 'POST',
    data: {
      endata: {
        action: 'getinfo',
      },
    },
  })
}

// 获取用户信息
export function getUserPlayData(username: string) {
  return request({
    url: '/getplaydata/',
    method: 'POST',
    data: {
      username,
    },
  })
}

// 注册
export function register(data: IUser) {
  return request({
    url: '/register/',
    method: 'POST',
    data: {
      endata: data,
    },
  })
}

// 绑定邮箱
export function mailBind(data: IMailBind) {
  return request({
    url: '/mailband/',
    method: 'POST',
    data: {
      endata: data,
    },
  })
}

// 确认邮箱绑定
export function mailVerify(data: IMailVerify) {
  return request({
    url: '/mailverify/',
    method: 'POST',
    data: {
      endata: data,
    },
  })
}

// 绑定手机
export function smsBind(data: ISMSBind) {
  return request({
    url: '/smsband/',
    method: 'POST',
    data: {
      endata: data,
    },
  })
}

// 确认手机绑定
export function smsVerify(data: ISMSVerify) {
  return request({
    url: '/smsverify/',
    method: 'POST',
    data: {
      endata: data,
    },
  })
}
