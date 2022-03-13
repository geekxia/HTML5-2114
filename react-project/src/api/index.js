import request from '@/utils/request'

// axios调接口，GET用params属性入参，POST请求用data属性入参
export function fetchLogin(data) {
  return request({url:'/login',method:'POST',data})
}

// 获取商品列表
export function fetchGoodList(params) {
  return request({url:'getGoodList',method:'GET',params})
}

// 商品新增与编辑
export function fetchGoodSubmit(data) {
  return request({url:'updateGood',method:'POST',data})
}

// 根据id获取商品详情
export function fetchGoodInfo(params) {
  return request({url:'getGoodInfo',method:'GET',params})
}

export function fetchGoodDel(data) {
  return request({url:'delGood',method:'POST',data})
}
