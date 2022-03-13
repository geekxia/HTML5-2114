import React, { PureComponent } from 'react'

// 学习目标：非常熟练地掌握React上下文的特点，能够使用上下文解决工作实践中的具体问题。

// 1、什么是上下文？有什么用？

// - 上下文是React官方提供一种数据通信方案，它允许我们自上而下地传递数据。怎么理解“自上而下”？意思是说，使用上下文传递数据只能由父级组件向后代组件传递，是一种单向的数据传递。
// - 在React中，我们可以使用 createContext() 创建上下文组件，在上下文对象中有一个Proiver组件可以“提供”数据，还有一个Consumer组件可以“消费”数据。


// 【一】在页面组件中使用上下文的第一种语法（不太好玩）
// import { ThemeContext } from '@/utils/theme'
// class TestContext extends PureComponent {
//   render () {
//     console.log('page context', this.context)
//     return (
//       <div>
//         <h1>学习上下文</h1>
//       </div>
//     )
//   }
// }
// TestContext.contextType = ThemeContext
// export default TestContext


// 【二】使用Consumer组件来访问上下文数据（推荐的写法）
import { Consumer } from '@/utils/theme'
export default class TestContext extends PureComponent {
  render () {
    return (
      <Consumer>
      {
        (theme)=>{
          return (
            <div style={{...theme}}>
              <h1>学习上下文</h1>
            </div>
          )
        }
      }
      </Consumer>
    )
  }
}
