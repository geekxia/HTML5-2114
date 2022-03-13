import React, { Component } from 'react'

// 学习目标：初步理解React组件的渲染流程及其特点。

// 1、React渲染流程是怎样的？

// -> 初始化时先执行constructor，再执行render方法，第一次返回JSX并生成“虚拟DOM(Fiber树)”，页面第一次完成渲染。
// -> 当有人使用this.setState()修改声明式变量时，这会触发render方法再执行，返回新的JSX并生成新的“虚拟DOM(Fiber树)”，React进一步执行“diff运算(协调运算)”，找出虚拟DOM中最小化的脏节点(变化的节点)，最后提交更新，视图发生了变化。

// 2、如何理解“JSX是不可变对象”？

// -> JSX是不可变对象，所以我们不要直接修改JSX。如果我们想修改JSX，一定要通过声明式变量来修改。

// -> 每当this.setState()修改声明式变量，都会触发render方法重新执行，所以就会返回一个完整的新的JSX。这会不会导致整个视图结构都重新渲染？当然不会啦。这是因为有“虚拟DOM(Fiber树)”和“diff运算(协调运算)”的存在。

// -> 因为JSX是不可变对象，所以每次有this.setState()修改声明式变量时，render方法不会去修改旧的JSX，而是返回一个完整的新的JSX。

export default class TestRender extends Component {
  // 在面向对象编程中，constructor是构造器函数
  // 在组件实例化时执行这个构造器函数
  // props 表示由父组件传递过来的自定义属性
  constructor (props) {
    super(props)  // 调用父类的构造器函数
    // 在这里用于定义声明式变量（响应式变量）
    // 什么是响应式？当声明式变量发生变化时，它所对应的视图节点自动更新。
    // 注意：只有使用this.setState()这个API来修改声明式变量，视图才会更新；如果用其它方式来修改声明式变量，视图是不更新的。
    // 在后面的逻辑中如何访问这些声明式变量呢？使用this.state来访问它们。需要注意的是this访问不到的。
    this.state = {
      num: 100,
      count: 200
    }
  }

  // 这是一个React的生命周期，相当于是Vue中的mounted()
  componentDidMount () {
    // 我们开一个定时器，每一秒让count加一。
    this.timer = setInterval(()=>{
      this.setState({count:this.state.count+1})
    }, 1000)
  }

  componentWillUnmount () {
    // 当路由切换时，组件要销毁。在销毁清除定时器！
    clearInterval(this.timer)
  }

  // 自定义方法。
  // 在其它作用域中要使用this来访问这些自定义方法
  add () {
    console.log('add click', this)
    // 在这里我要修改声明式变量，并希望视图自动更新
    // this.state.num++  这种直接修改声明式变量的方式，视图是不更新的。
    // 我们只有使用this.setState()这个API来修改声明式变量，页面才更新。
    this.setState({
      num: this.state.num + 1
    })
  }

  // 这是当前组件的渲染函数，它必须要有返回值。
  // 它返回的是JSX元素，也就是所谓的视图结构。
  render () {
    console.log('----rendered')
    // 我们在使用声明式变量时，建议先解析再使用。
    const { num, count } = this.state
    const view = (
      <div>
        <h1>学习渲染流程</h1>
        <h1>{ num }</h1>
        <button onClick={this.add.bind(this)}>自增</button>
        <hr/>
        <h1>{ count }</h1>
      </div>
    )
    return view
  }
}
