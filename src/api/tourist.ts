import { post } from '@/api/common/request'
import type { ITourist } from '@/api/types'

// 获取tourist列表
export function getTouristList() {
  return post('/research_trip/visitor/getresearch_trip/', { action: 'getResearch_Trip' })
}

// 获取tourist-section列表
export function getTouristSectionList(tindex: string) {
  return post('/trip_scene/visitor/gettrip_scene/', {
    action: 'getTrip_Scene',
    tindex,
  })
}

// 获取registration_list表
export function getRegistrationList() {
  return post('/registration_list/visitor/getregistration_list/', { action: 'getRegistration_list' })
}

// 修改registration_list表
export function addRegistrationList(data: ITourist) {
  return post('/back/alterregistration_list/', data)
  // endata: {
  //   action: 'addRegistration_list',
  //   uindex,
  //   tsindex,
  //   tindex,
  //   mates,
  //   phone_number,
  //   remarks,
  // },
}
