import { PureComponent } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  count: state.study.count,
  msg: state.study.msg
})

const mapDispatchToProps = dispatch => ({
  add: payload => {
    dispatch({ type:'add', payload })
  },
  sub: payload => {
    dispatch({ type:'sub', payload })
  }
})

// 使用ES6装饰器语法
// 注意，要安装两个babel插件，参见babel.config.js文件
@connect(mapStateToProps, mapDispatchToProps)
class GoodList extends PureComponent {
  render () {
    const { count, add, sub } = this.props
    return (
      <div style={{textAlign:'center'}}>
        <h1>商品列表页面</h1>
        <h1>{ count }</h1>
        <button onClick={()=>add(8)}>自增</button>
        <button onClick={()=>sub(7)}>自减</button>
      </div>
    )
  }
}

export default GoodList
