import produce from "immer"

const initState = {
  token: localStorage.getItem('token') || ''
}

export default (state=initState, {type,payload}) => {
  return produce(state, state=>{
    switch (type) {
      case 'user/login':
        state.token = payload
        break
      default:
    }
  })
}
