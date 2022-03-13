
import { useSelector, useDispatch } from 'react-redux'
// 注意：Hooks只能在函数式组件中使用
// - useSelector() 用于访问上下文中的redux数据
// - useDispatch() 得到dispatch方法，可以向redux派送action

// 提问：在这个函数式的React组件中，如何与redux关联？
// 答案：使用connect高阶，或者使用Hooks来实现（特别推荐）
// - connect高阶组件，它是把redux相关的数据和方法，放在props上
// - hooks，它是直接访问，与props无关
export default () => {

  // 访问根state中study子模块中的count
  const count = useSelector(state=>state.study.count)
  // 得到dispatch，用来向redux派发action
  const dispatch = useDispatch()

  return (
    <div style={{textAlign:'center'}}>
      <h1>商品列表页面</h1>
      <h1>{ count }</h1>
      <button onClick={()=>dispatch({type:'add',payload:8})}>自增</button>
      <button onClick={()=>dispatch({type:'sub',payload:4})}>自减</button>
    </div>
  )
}
