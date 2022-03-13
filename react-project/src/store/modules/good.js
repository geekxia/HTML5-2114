import produce from "immer"

const initState = {
  list: [],
  total: 0,
  done: 0,
  info: null
}

export default (state=initState, {type,payload}) => {
  return produce(state, state=>{
    switch (type) {
      case 'good/list':
        const { total, list } = payload
        state.list = list
        state.total = total
        break
      case 'good/done':
        state.done = payload
        break
      case 'good/info':
        state.info = payload
        break
      case 'good/reset':
        state.info = null
        break
      default:
    }
  })
}
