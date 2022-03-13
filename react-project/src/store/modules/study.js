import produce from 'immer'

// 定义在redux中的数据，可被React组件共享
const initState = {
  count: 1,
  list: [],
  msg: '2114'
}

// state参数，就是状态管理数据，可以React组件共享的数据
// action参数，是一种信号，是用来修改state的信号
// action的格式是固定的 {type,payload}，你可这样理解：type是邮件标题，payload是邮件内容。

// 用人话描述一下produce：第一个参数传入旧的state，经过内部深复制，在第二个回调函数中可以拿到深复制的结果；在回调函数中对深复制的结果进行修改（加工），最终修改的结果就是produce的返回值。

export default (state=initState, {type, payload}) => produce(state, state=>{
  // 会根据action信号来修改state，state发生变化，React组件会自动更新。
  switch (type) {
    case 'study/add':
      state.count += payload
      break
    case 'study/sub':
      state.count -= payload
      break
    default:
  }
})
