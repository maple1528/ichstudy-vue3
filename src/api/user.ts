import request, { post } from '@/utils/request'
import type { IMailBind, IMailVerify, ISMSBind, ISMSVerify, IUser } from '@/api/types'

// 登录
export const login = (data: IUser) => {
  return post<IUser>('/login/', data)
}

// 退出登录
export function logout() {
  return post('/user', { action: 'logout' })
}

// 获取用户信息
export function getUserInfo() {
  return post('/user', { action: 'getinfo' })
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
  return post<IUser>('/register/', data)
}

// 绑定邮箱
export function mailBind(data: IMailBind) {
  return post<IMailBind>('/mailband/', data)
}

// 确认邮箱绑定
export function mailVerify(data: IMailVerify) {
  return post<IMailVerify>('/mailverify/', data)
}

// 绑定手机
export function smsBind(data: ISMSBind) {
  return post<ISMSBind>('/smsband/', data)
}

// 确认手机绑定
export function smsVerify(data: ISMSVerify) {
  return post<ISMSVerify>('/smsverify/', data)
}
