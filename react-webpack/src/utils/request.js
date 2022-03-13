// 在这里封装axios

import axios from 'axios'

const baseURL = 'http://localhost:8080'
const verson = '/api/v1'

const instance = axios.create({
  baseURL: baseURL + verson,
  timeout: 5000,
  headers: {}
})

// 请求拦截器
instance.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(function (response) {
  // 数据过滤
  if (response.data && response.status===200) {
    if (response.data.success) {
      return response.data.data
    }
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

export default instance
