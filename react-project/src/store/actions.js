import {
  fetchLogin,
  fetchGoodList,
  fetchGoodSubmit,
  fetchGoodInfo
} from '@/api'

// 用于调接口的
export function login(data) {
  // 这个dispatch，是redux-thunk这个中间件给的
  return function(dispatch) {
    console.log('dispatch', dispatch)
    fetchLogin(data).then(res=>{
      console.log('登录成功', res)
      if (res.token) {
        // 当异步调接口成功后，再派发token到store中去
        dispatch({type:'user/login',payload:res.token})
        // 除了把token放在store中，还会存储在本地
        localStorage.setItem('token', res.token)
      }
    })
  }
}

// 功能：获取商品列表（封装好后，给页面中dispatch(getList(入参))）
export function getList(params) {
  return function (dispatch) {
    fetchGoodList(params).then(res=>{
      console.log('商品列表', res)
      // 暂时，还没有把商品数据派发到store中
      if (res.list) {
        dispatch({type:'good/list',payload:res})
      }
    })
  }
}

// 功能：商品新增或编辑
export function submitGood(data) {
  return function (dispatch) {
    fetchGoodSubmit(data).then(res=>{
      console.log('商品提交成功', res)
      dispatch({type:'good/done',payload:1})
    })
  }
}

// 功能：获取商品详情数据、用于填充编辑表单
export function getInfo(id) {
  return function (dispatch) {
    fetchGoodInfo({id}).then(res=>{
      console.log('商品详情', res)
      if (res.info) {
        dispatch({type:'good/info',payload:res.info})
      }
    })
  }
}
