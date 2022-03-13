import React, { PureComponent, Fragment } from 'react'

// 学习目标：能够熟练地编写高阶组件，并且有能力识别别人的高阶组件。还要有能力巧用高阶组件解决代码逻辑复用方面的问题。

// 1、高阶组件有什么用？是一种代码逻辑复用的技巧，是一种设计模式(React开发经验)。

// 2、什么是高阶组件？高阶组件本质上是一个纯函数，所以高阶组件也叫做高阶函数；因为高阶组件可以“修饰”我们普通的UI组件，所以高阶组件也叫做容器组件。

// 3、特别注意：封装高阶组件时，一定要“属性继承”，避免因为多个高阶组件同时作用时丢失props。

// 高阶组件的基本特点：它接收一个UI组件作为参数，经过一层“修饰”，返回一个新组件。
function page1(WrappedComponent) {
  // 定义一个新的组件
  class NewComponent extends PureComponent {
    render () {
      return (
        <>
          <WrappedComponent />
          <footer>我公共的底部</footer>
        </>
      )
    }
  }
  return NewComponent
}

const page2 = C => {
  return class extends PureComponent {
    render () {
      return (
        <>
          <C />
          <footer>我是公共的底部</footer>
        </>
      )
    }
  }
}

const page3 = C => (
  class extends PureComponent {
    render () {
      return (
        <>
          <C />
          <footer>我是公共的底部</footer>
        </>
      )
    }
  }
)

const page4 = C => {
  const NewC = props => (
    <>
      <C />
      <footer>我是公共的底部</footer>
    </>
  )
  return NewC
}

const page5 = C => (
  props => (
    <>
      <C />
      <footer>我是公共的底部</footer>
    </>
  )
)

// 【推荐这种比较优雅的写法】
const page = C => props => (
  <>
    <C />
    <footer>我是公共的底部</footer>
  </>
)

// 注意：这也是高阶组件，只不过这种高阶组件更高阶
const dengjun = arg1 => arg2 => C => props => (
  <>
    <C />
    <footer>我是公共的底部</footer>
  </>
)

// function dengjun (arg1) {
//   return function (arg2) {
//     return function (C) {
//       return props => (
//         <>
//           <C />
//           <footer>我是公共的底部</footer>
//         </>
//       )
//     }
//   }
// }

const role = C => props => <C {...props} role='admin' />

const modal = C => props => {
  const al = () => { alert('我是弹框') }
  const co = () => { confirm('你确定要删除吗？') }
  return <C {...props} onAlert={al} onConfirm={co} />
}


// [上面的代码演示如何定义高阶组件]
// ===========================================================
// [下面的代码演示如何使用高阶组件]

// 【类组件，不使用装饰器语法时的写法】
// class TestHoc extends PureComponent {
//   render () {
//     return (
//       <div>
//         <h1>学习高阶组件</h1>
//       </div>
//     )
//   }
// }
// export default page(TestHoc)

// 【类组件，使用装饰器语法时的写法】
// @page
// @dengjun(1)(2)
// class TestHoc extends PureComponent {
//   render () {
//     return (
//       <div>
//         <h1>学习高阶组件</h1>
//       </div>
//     )
//   }
// }
// export default TestHoc


// 【函数式组件，不能使用装饰器语法了，要像下面这样写代码】
// const TestHoc = props => (
//   <div>
//     <h1>学习高阶组件</h1>
//   </div>
// )
// export default page(TestHoc)

// 【函数式组件，一步到位地使用高阶组件的写法】
// export default dengjun(1)(2)(
//   page(
//     props => (
//       <div>
//         <h1>学习高阶组件</h1>
//       </div>
//     )
//   )
// )

// 使用高阶组件时，是有先后顺序的。
@role
@modal
class TestHoc1 extends PureComponent {
  render () {
    console.log('TestHoc props', this.props)
    const { role, onAlert } = this.props
    // 需求：有且仅有当前用户是admin时，才能够看到“添加员工”的按钮
    return (
      <div>
        <h1>学习高阶组件</h1>
        { role==='admin' && <button onClick={()=>onAlert()}>添加员工</button> }
      </div>
    )
  }
}
// export default modal(role(TestHoc))
// export default TestHoc


export default role(
  modal(
    ({role, onAlert}) => (
      <div>
        <h1>学习高阶组件</h1>
        { role==='admin' && <button onClick={onAlert}>添加员工</button> }
      </div>
    )
  )
)
