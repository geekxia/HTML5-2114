import React, { Component } from 'react'
import PropTypes from 'prop-types'

// 学习目标：初步知道React两种组件之间的差异，以及什么是props。

// 1、两种组件的特点

// -> clas类组件：用面向对象语法编写的组件，有生命周期，有this，有state状态，有上下文、有ref，这些特性都拥有。

// -> 函数式组件：用function或箭头函数定义的组件，没有生命周期，没有this，没有state状态，没有上下文，没有ref，这些特性都没有。

// -> 它们的共同点：无论是类组件，还是函数式组件，都拥有props。什么是props？表示父组件传递过来的自定义属性。

// -> 类组件运行速度较慢，所以性能较差。函数式组件运行速度比较快，所以性能较好。目前市场中，函数式组件用得越来越多了，类组件正在逐步被淘汰。


// 2、充分理解props

// -> props是组件之间数据通信的纽带，表示由父组件传递过来的自定义属性。在React中，props非常非常重要。也是React组合化的重要技术点。

// -> 在React中，props可以支持这些数据类型：Number、String、Boolean、undefined、null、Function、JSX、Object、Array。

// -> 关于props属性命名的注意事项：当封装组件时，我们设计props时：如果属性值是函数，那么属性名要满足“onRunAndEat”以on开关的格式；属性名不能命名为'children'，这是因为在JSX语法中，被自定义组件所包裹的元素叫做‘children’。

// -> 在JSX中，props.children 是一个特殊的属性，它表示自定义组件内部所嵌套的子节点们。

// -> props 代表的是父组件传递过来的数据，在子组件中可以参与视图的渲染、或者某些逻辑运算。需要注意的是：props是只读的，它能参与运算，但你不能修改它。

// -> 那么在React中，如何对props进行数据校验呢？在这里我们推荐使用 prop-types 这个第三方包来实现props数据校验。工作中，我们在校验props数据时，一般只考虑两个问题：必传与非必传、数据类型的正确性。参考链接：https://www.npmjs.com/package/prop-types

// -> 除了使用prop-types这个库来校验props外。在TS环境中，我们还可以使用TS来校验props。

const ChildA = (props) => {
  console.log('测试props支持的数据类型', props)
  return (
    <div>
      <div>我是一个孩子：{props.name}</div>
      { props.children }
      <div>{'我的年龄是：'+(props.age+1)}</div>
    </div>
  )
}
// 使用prop-types这个库来约束props数据
ChildA.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  checked: PropTypes.bool,
  footer: PropTypes.element,   // JSX元素类型 | null | undefined
  header: PropTypes.element,
  body: PropTypes.node,        // element | string | number | bool
  onEat: PropTypes.func,       // function
  list: PropTypes.array.isRequired,
  data: PropTypes.array,
  info: PropTypes.object,
  gender: PropTypes.oneOf(['男','女'])  // 只能传其中的一个值
}

function ChildB (props) {
  return (
    <div>我也是一个孩子：{props.name}</div>
  )
}

export default class TestProps extends Component {
  constructor (props) {
    super(props)
    // console.log('TestProps props', props)
  }
  render () {
    // console.log('test props props', this.props)
    return (
      <div>
        <h1>学习两种组件与Props</h1>
        <ChildA
          name={'大狗蛋儿'}
          age={10}
          checked
          footer={<div>我是腿</div>}
          header={<div>我是头</div>}
          body={false}
          onEat={()=>console.log('会吃饭')}
          list={[1,<span key={2}>2</span>,true]}
          info={{a:1,b:2,c:3}}
          data={[{price:10},{num:20}]}
          gender={'男'}
        >
          <div>我是孩子的孩子-1</div>
          <div>我是孩子的孩子-2</div>
        </ChildA>
        <hr/>
        <ChildB name='小狗蛋儿' />
      </div>
    )
  }
}
