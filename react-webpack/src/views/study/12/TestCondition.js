import React, { PureComponent } from 'react'

// Component这个类，有一个shouldComponentUpdate()的生命周期，它留给用户做性能优化的。
// PureComponent这个类，没有shouldComponentUpdate()这个生命周期，它会自动帮助我们优化那些不参与视图渲染的声明式变量。

// 学习目标：在指定的条件下元素的显示与隐藏。

// 1、对单个元素进行条件渲染
// 语法：{ 布尔表达式 && <div>元素</div> }

// 2、对两个元素进行条件渲染
// 语法：三元表达式 ? <div>元素1</div> : <div>元素2</div>

// 3、对两个以上的元素进行条件渲染
// 说明：当元素渲染比较复杂时，建议封装自定义的渲染函数，根据声明式变量的运算结果返回指定的JSX或null。

export default class TestCondition extends PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      bol: true,
      day: 'white',
      row: 0
    }
  }

  toggle1 () {
    // 怎么修改声明式变量？this.setState(fn)
    this.setState(state=>({bol: !state.bol}))
  }

  toggle2 () {
    // 怎么修改声明式变量？
    this.setState(_=>({day: _.day==='white' ? 'black' : 'white'}))
    // const newDay = this.state.day === 'white' ? 'black' : 'white'
    // this.setState({day: newDay})
  }

  toggle3 () {
    // 0、1、2、3、0、1。。。。
    this.setState(_=>({row: (_.row+1)%4}))
  }

  // 自定义封装渲染方法，要求一定要返回有效的JSX元素或null
  rowRender () {
    const { row } = this.state
    let result = null
    switch (row) {
      case 0:
        result = <h1>第一行文字</h1>
        break
      case 1:
        result = <h1>第二行文字</h1>
        break
      case 2:
        result = <h1>第三行文字</h1>
        break
      case 3:
        result = <h1>第四行文字</h1>
        break
      default:
    }
    return result
  }

  render () {
    const { bol, day, row } = this.state
    return (
      <div>
        <h1>学习条件渲染</h1>
        <hr/>
        {
          !bol && <h1><span>我是一个可有可无的人</span></h1>
        }
        <button onClick={()=>this.toggle1()}>显示/隐藏</button>
        <hr/>

        {
          (day==='white') ? <h1>太阳</h1> : <h1>月亮</h1>
        }
        <button onClick={()=>this.toggle2()}>白天/黑夜</button>
        <hr/>

        { this.rowRender() }
        <button onClick={()=>this.toggle3()}>切换行</button>
      </div>
    )
  }
}
