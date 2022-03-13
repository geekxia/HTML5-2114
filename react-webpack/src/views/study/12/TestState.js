import React from 'react'

// 学习目标：深入理解state的特点（声明式），学习this.setState()这个方法的使用。

// 1、怎么理解“声明式”？

// 当我们需要渲染(操作)界面节点时，我们先声明一个state变量，再使用这个state变量去参与视图节点的渲染或交互。
// 提示：state变量只能在constructor中进行定义。
// 声明式变量的特点：当使用this.setState()来修改state变量时，会触发render()方法再次执行，返回新的JSX（Fiber树），再进一步执行diff运算(协调运算)，commit提交更新视图。
// 如何定义state？如何使用state？如何修改state？


// 2、详细介绍this.setState()这个专属方法。

// 语法1：this.setState({},callback)  当我们修改state时，新值与旧值无关时，建议用语法1。
// 语法2：this.setState((state,props)=>({}), callback)  当我们修改state时，新值是由旧值计算而来，建议用语法2。

// this.setState(xx, callback) 这个callback表示异步执行state更新任务已完成。
// 注意：state可以参与运算，但不建议直接修改state。在业务逻辑中，你可以`const num = this.state.num + 100`，但不建议写这样的代码`this.state.num++`。

// 注意：在react中，修改state只能使用this.setState()来修改，不要直接修改state。原因是直接修改state，不会触发render()；只有使用this.setState()来修改state，才会触发render()。

// 注意：this.setState()在合成事件、生命周期钩子函数中，默认是异步的。为什么是异步的呢？为了性能优化(尽可能地减少没必要的render()执行)，所以react官方封装了一系列的合成事件(交互事件、生命周期)，在合成事件中把this.setState()变成异步的，目的是合并多个异步的this.setState()，减少没必要的render()。

// 在合成事件(交互事件、生命周期)中，this.setState()是异步的，当有多个this.setState()时，React会自动将它们合并起来的。

// 在定时器(setTimeout/setInterval)、Promise.then()中，this.setState()是同步的，所以React不会对多个this.setState()进行合并。

export default class TestState extends React.Component {
  constructor (props) {
    super(props)
    // 在这里定义声明式变量
    this.state = {
      info: {
        name: 'ganteng',
        age: 20
      },
      count: 1
    }
  }

  addHandle () {

    // this.setState({
    //   count: this.state.count + 1
    // }, ()=>{
    //   console.log('1--new state count', this.state.count)
    // })

    // this.setState((state)=>{
    //   // do something
    //   return {
    //     count: state.count + 1
    //   }
    // }, ()=>{
    //   console.log('1--new state count', this.state.count)
    // })

    this.setState((state)=>({
      count: state.count + 5
    }), ()=>{
      console.log('1--new state count', this.state.count)
    })

    console.log('2--new state count', this.state.count)
  }

  countChange1 () {
    // 需求：把count变成10000
    this.setState({count: 10000})
  }

  countChange2 () {
    // 执行几次render()？只执行一次，react会自动合并下面这些this.setState()
    // this.setState({
    //   count: 100,
    //   info: { name: 'junjie', age: 30 }
    // })
    // this.setState({
    //   count: 200
    // })
    // 等价于
    this.setState({
      count: 200,
      info: { name: 'junjie', age: 30 }
    })
  }

  xxxHandle () {
    this.setState({
      a: 1,
      b: 1
    })
    this.setState({
      c: 2,
      d: 2
    })
    this.setState(state=>({
      a: state.a + 100,
      c: state.c + 200
    }))
    this.setState(state=>{
      const newD = state.d + 300
      return {
        d: newD
      }
    })
    // 合并的结果（你自测一下）
    this.setState(state=>({
      a: state.a + 100,
      b: 1,
      c: state.c + 200,
      d: state.d + 300
    }))
  }

  countChange3 () {
    setTimeout(()=>{
      // 在定时器或Promise.then()方法中，this.setState()是同步的代码。
      // 在这里，因为this.setState()是同步的，所以React不会对它们进行合并。
      // 如果一定要给一个解释，你可这么想：因为定时器是宏任务，不在合成事件的作用域范围内，React无法控制this.setState()的异步性。
      this.setState(state=>({
        count: state.count + 2
      }), ()=>{
        console.log('1--new state count', this.state.count)
      })

      this.setState(state=>({
        count: state.count - 1
      }), ()=>{
        console.log('2--new state count', this.state.count)
      })

      console.log('3--new state count', this.state.count)

    }, 0)
  }

  render () {
    const { info, count } = this.state
    console.log('--render')
    return (
      <div>
        <h1>学习state</h1>
        <hr/>
        <h2>用户名：{ info.name }</h2>
        <h2>年龄：{ info.age }</h2>
        <hr/>
        <h1>{ count }</h1>
        <button onClick={()=>this.addHandle()}>自增</button>
        <button onClick={()=>this.countChange1()}>变成一万</button>
        <button onClick={()=>this.countChange2()}>改变数量</button>
        <button onClick={()=>this.countChange3()}>延时改变数量</button>
      </div>
    )
  }
}
