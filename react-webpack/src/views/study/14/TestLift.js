import React, { PureComponent } from 'react'

// 学习目标：从React框架自身的角度，学习组件之间的数据通信方案。React官方为这种组件之间的通信方案提供一个思想，这个思想就是“状态提升”。

// 1、什么状态提升？

// - 在React中，当两个组件之间需要共享一个状态数据时，我们的思路是向上找到它俩最近的父级组件，并把状态变量定义在这个最近的父级组件中。
// - 语法基础：使用props(自定义属性、自定义事件)实现父子组件之间的数据通信。

// 2、给几个JSX语法约定

// - 无论是类组件，还是函数式组件，其组件名字的首字母必须是大写的。如果一个函数，其函数名的首字母是小写，我们就认为这个函数是普通函数，不是React组件。
// - 当我们谈论父子组件时，谈论的是自定义组件，不包括那些HTML标签。
// - 再次强调props的重要性：在React中，props是父子组件之间的通信纽带，props可以向子组件传递基本数据类型、引用数据类型、自定义事件、JSX元素等。需要注意的是，当props向子组件传递自定义事件时，自定义事件的名字要以 on 开头。

// 3、React父子组件之间是如何通信的呢？

// - 父组件向子组件传递数据，使用自定义属性。
// - 子组件向父组件回传数据，使用自定义事件。

// - 温馨提示：父子组件通信，在React开发中是非常普遍的一种语法基础。


const Celsius = ({value, onChange}) => {
  // console.log('---Celsius', props)
  const change = (ev) => {
    // console.log('表单变化了', ev.target.value)
    // 当表单发生变化时，我们要把表单的最新值回传给父组件
    // 父组件收到最新值，再修改父组件中的那个声明式变量
    // 问题：我该怎么把表单的最新值回传给父组件呢？
    // 答案：自定义事件。
    onChange(ev.target.value)
  }
  return (
    <div>
      <h6>摄氏温度：</h6>
      <input type="text" value={value} onChange={change} />
    </div>
  )
}

const Fahrenheit = ({value}) => {
  // console.log('----Fahrenheit', props)
  // 接收父组件传递过来的摄氏温度，进一步计算变成华氏温度
  const temper = (value + 32) * 9 / 5
  return (
    <div>
      <h6>华氏温度：{ temper }</h6>
    </div>
  )
}

export default class TestLift extends PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      temper: 0   // 摄氏温度
    }
  }

  getTemper (ev) {
    // console.log('收到了子组件回传的数据', ev)
    this.setState({temper: Number(ev)})
  }

  render () {
    const { temper } = this.state
    return (
      <div>
        <h1>学习状态提升</h1>
        <hr/>
        <Celsius value={temper} onChange={(ev)=>this.getTemper(ev)} />
        <hr/>
        <Fahrenheit value={temper} />
        <hr/>
      </div>
    )
  }
}
