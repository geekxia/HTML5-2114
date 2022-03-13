import React, { Component, PureComponent } from 'react'

// 学习目标：从生命周期的角度，理解类组件的运行流程。
// React生命周期分为三个阶段：装载阶段(3)、更新阶段(2)、卸载阶段(1)。
// 注意：在React所有的生命周期中，render()这个生命周期钩子函数是必须要有的。

// 1、装载阶段：表示组件初始化到第一次渲染完成。
// - constructor 初始化时
// - render 开始渲染时
// - componentDidMount  第一次完成渲染时

// 2、更新阶段：this.setState()执行时，到视图再次渲染完成。
// - shouldComponentUpdate  是个“开关”，用于性能优化的
// - render 再次开始渲染
// - componentDidUpdate  再次渲染完成时

// 3、卸载阶段：当组件被销毁时。
// - componentWillUnmount 表示组件将要开始销毁

export default class TestLifecycle extends Component {
  // constructor()
  // 当组件初始化时执行，在组件的一生中它只执行一次。
  // 在这里一般只做两件事：super(props)、定义state声明式变量。
  // 注意1：props是由父组件传递过来的数据，不能直接修改props。
  // 注意2：props和state不要交叉赋值，不要对props进行若干运算、再赋值给state。
  // 原则：在这里一定要保证state和props是独立的，彼此之间不要产生任何关系，因为这会导致不可预测的bug。
  // 注意3：在constructor中不要使用this.setState()方法，这没有必要。
  // 注意4：在constructor中也不要做一些其它任务，比如开启定时器、调接口、DOM操作。这些额外的逻辑操作，都不建议在这里执行。
  constructor (props) {
    // 调用父类Component的构造器函数
    // super(props) 必须是constructor的第一行代码
    super(props)
    // 在这里定义state声明式变量
    this.state = {
      num: 2
    }
    console.log('-----constructor')
  }

  // componentDidMount()
  // 它相当于Vue中的mounted()，表示当前组件第一次渲染完成
  // 在这里你可以开定时器、调接口、DOM操作等；也就是说，那些不建议在constructor中做的事，在这里都可以做。
  // 在这里可以放心地使用this.setState()，进一步触发render()再执行。
  componentDidMount () {
    console.log('-----componentDidMount')
    document.getElementById('num').style.color = 'red'
    // setInterval(()=>{
    //   this.setState(state=>({
    //     num: state.num + 1
    //   }))
    // }, 1000)
  }

  // shouldComponentUpdate()
  // 它是一个“开发”，控制“是否执行更新阶段”，用于React组件的性能优化。
  // 注意：这个生命周期钩子一旦定义，无论如何都必须返回一个布尔值。如果返回true，组件将正常进入更新阶段；如果返回false，组件将不再进入更新阶段。
  // 场景：比如我们定义了10个state变量，其中有1个state变量不参与视图渲染，另外9个state变量参与了视图渲染。这时，我们就可以在shouldComponentUpdate这个方法中，自定义控制这个不参与渲染的变量，当它变化时不进入更新阶段，以节省性能。

  // 在最新的React中PureComponent中，这个生命周期的钩子函数已经没有了。PureComponent会自动地帮助我们做这样的性能优化。

  // 在工作中，这个生命周期很少使用，但面试官经常爱问。
  shouldComponentUpdate (props, state) {
    console.log('-----shouldComponentUpdate', state.num)
    return state.num % 2 === 0
  }

  // componentDidUpdate()
  // 它相当于Vue中的updated()，表示视图更新已完成。
  // 它的作用和this.setState(xxx,callback)中的callback功能是一致的，都表示state声明式变量修改并且视图更新已完成。
  // 结论：所以我们一般很少使用this.setState(xxx,callback)的callback，React官方建议使用componentDidUpdate()。
  componentDidUpdate () {
    console.log('-----componentDidUpdate')
  }

  // componentWillUnmount()
  // 它相当于Vue中的beforeDestroy()，表示即将进入销毁阶段
  // 在这里一般用于清除定时器、清除长连接、清除缓存等。
  // 在这里，不建议使用this.setState()
  componentWillUnmount () {
    console.log('-----componentWillUnmount')
  }

  // render()
  // 这个生命周期函数是必须要有的，并且必须返回有效的JSX元素，或者返回null
  // 所以render()必须有return语句。
  // render到底做了什么事？render()执行并返回JSX(视图结构)，异步地生成Fiber(虚拟DOM)，进一步执行协调运算(diff)，最后commit提交更新DOM。
  // 在return之前你可以编写你的业务逻辑，比如一些常规的运算逻辑。
  // 注意：在render()方法的内部，不能调用this.setState()，这会导致组件更新死循环。
  render () {
    console.log('-----render')
    const { num } = this.state
    return (
      <div>
        <h1>学习生命周期</h1>
        <h1 id='num'>{ num }</h1>
        <button
          onClick={()=>this.setState(state=>({num: state.num+1}))}
        >自增</button>
      </div>
    )
  }
}
