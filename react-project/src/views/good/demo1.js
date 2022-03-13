import { connect } from 'react-redux'
// 语法：connect(mapStateToProps, mapDispatchToProps)(UI组件)
// 理解：mapStateToProps用于把store数据放在props上，mapDispatchToProps用于把修改store的方法放在props上。

function mapStateToProps(state) {
  console.log('上下文中的store', state)
  return {
    count: state.study.count,
    msg: state.study.msg
  }
}

function mapDispatchToProps(dispatch) {
  // dispatch 用于“派发”一个信号(action)，信号可以修改store
  console.log('dispatch', dispatch)
  return {
    add: function() {
      console.log('clicked')
      // 我们的需求是，通过 dispatch 这个方法向store派发一个“自增”的信号
      dispatch({ type:'add', payload: 10 })
    },
    sub: function() {
      dispatch({ type:'sub', payload: 5 })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  props => {
    console.log('GoodList props', props)
    return (
      <div style={{textAlign:'center'}}>
        <h1>商品列表页面</h1>
        <h1>{ props.count }</h1>
        <button onClick={props.add}>自增</button>
        <button onClick={props.sub}>自减</button>
      </div>
    )
  }
)
