import request from '@/utils/request'

export function fetchCnode(params) {
  return request({url:'/topics', method:'GET', params})
}
