import React, { PureComponent } from 'react'

import { inject, observer } from 'mobx-react'

// 特别注意：observer离组件更近，从语法的角度来讲，它会优先起作用。
// @inject('article')
// @observer
// class TestMobx extends PureComponent {
//
//   click () {
//     const { article } = this.props
//     article.add(5)
//   }
//
//   render () {
//     console.log('test mobx', this.props)
//     const { article } = this.props
//     return (
//       <div>
//         <h1>学习Mobx</h1>
//         <h1>{ article.count }</h1>
//         <button onClick={()=>this.click()}>自增</button>
//       </div>
//     )
//   }
// }
// export default TestMobx


// 在函数式组件中使用mobx
export default inject('article')(
  observer(
    ({ article }) => {
      return (
        <div>
          <h1>学习Mobx</h1>
          <h1>{ article.count }</h1>
          <button onClick={()=>article.add(10)}>自增</button>
        </div>
      )
    }
  )
)
