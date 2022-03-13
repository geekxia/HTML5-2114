import axios from 'axios'
import { message } from 'antd'

const baseURL = 'http://localhost:8080'
const verson = '/apix/v1'

const instance = axios.create({
  baseURL: baseURL + verson,
  timeout: 5000,
  headers: {}
})

// 请求拦截器
instance.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(response => {
  // 数据过滤
  if (response.data && response.status===200) {
    if (response.data.err===0) {
      return response.data.data
    } else {
      // 如果接口的业务数据有误，弹框提示用户
      message.error(response.data.msg)
    }
  }
  return response
}, error =>{
  return Promise.reject(error)
})

export default instance
