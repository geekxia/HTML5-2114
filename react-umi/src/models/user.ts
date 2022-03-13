import { fetchLogin } from '@/services'

export default {
  namespace: 'user',
  state: {
    token: '1234'
  },
  // 相当于vuex中mutations
  reducers: {
    changeToken(state, action) {
      // 一定要开启immer
      state.token = action.payload
      console.log('new state token', state.token)
    }
  },
  // 相当于vuex中actions
  effects: {
    * login({payload}, {call, put}) {
      console.log('redux effect', payload)
      // call('接口方法', '入参') 触发调接口
      const token = yield call(fetchLogin, {})
      console.log('token', token)
      // put({type,payload}) 相当于dispatch()
      yield put({type:'changeToken',payload:token})
    }
  }
}
