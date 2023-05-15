import { post } from '@/api/common/request'
import type { IUpload } from '@/api/types'

export function uploadMy(data: IUpload) {
  data.action = 'updplaydata'
  return post('/course/', data)
}
