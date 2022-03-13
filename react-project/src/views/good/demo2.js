import { connect } from 'react-redux'

export default connect(
  state => ({
    count: state.study.count,
    msg: state.study.msg
  }),
  dispatch => ({
    add: payload => {
      dispatch({ type:'add', payload })
    },
    sub: payload => {
      dispatch({ type:'sub', payload })
    }
  })
)(
  props => {
    console.log('GoodList props', props)
    const { count, add, sub } = props
    return (
      <div style={{textAlign:'center'}}>
        <h1>商品列表页面</h1>
        <h1>{ count }</h1>
        <button onClick={()=>add(2)}>自增</button>
        <button onClick={()=>sub(3)}>自减</button>
      </div>
    )
  }
)
