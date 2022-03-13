import React, { Component } from 'react'

// 学习目标：熟练事件绑定及其相关的操作——事件对象、阻止冒泡、阻止默认事件、键盘事件、鼠标事件。

// -> 合成事件：为了性能优化，React把咱们常用的事件都重新封装了一遍，这些被重新封装过的事件，就叫做合成事件。比如 onClick、onKeyUp、onKeyDown、onKeyPress、onMouseMove、onMouseEnter、onChange、onInput、onBlur等等。

// -> 注意：在React中无论是合成事件，还是封装组件时的自定义事件，都要以 on* 开头，这是JSX语法的要求。

// -> 问题：在React类组件中，事件处理器函数域中默认是没有this的。怎么办呢？用ES5的bind()方法来改变this指向，或者使用ES6箭头函数来绑定事件。

// 1、使用ES5方式来绑定事件【不推荐使用了】

// -> 语法：<button onClick={this.add.bind(this)}></button>
// -> 怎么拿到事件对象？事件处理器函数的最后一个参数永远都是事件对象。
// -> 如何自定义事件参数？<button onClick={this.add.bind(this,'参数')}/>

// 2、使用ES6箭头函数来绑定事件【推荐使用】

// -> 语法：<button onClick={(ev)=>this.add(ev)}></button>
// -> 怎么拿到事件对象？在要箭头函数中手动传递事件对象。
// -> 如何自定义事件参数？<button onClick={ev=>this.add(ev,10)}/>

// 3、在React中如何阻止默认事件？
// -> 无论是ES5方式绑定事件，还是ES6方式绑定事件，都使用 ev.preventDefault() 来阻止默认事件。

// 4、在React中如何阻止冒泡？
// -> 无论是ES5方式绑定事件，还是ES6方式绑定事件，都使用 ev.stopPropagation() 来阻止冒泡。

// 5、关于事件绑定的一些注意事件
// -> 绑定事件建议使用ES6箭头函数语法，不要再使用ES5方式。
// -> 绑定事件，都要使用 on* 系列的合成事件。
// -> 事件处理器中的一些事件操作，都和JS事件完全一致，比如阻止冒泡、键盘操作等。

// 6、在函数式组件中如何绑定事件呢？
// -> 注意：在函数式组件中没有this，所以在函数式组件中绑定事件无须再考虑this指向问题了。
// -> 绑定事件时，合成事件on* 的值是事件处理器，只有这个事件处理器才有事件对象。

const Child = (props) => {
  const add = (ev) => {
    console.log('child add', ev)
  }
  // function add (ev) {
  //   console.log('child add', ev)
  // }
  return (
    <div>
      <h2>我是孩子[函数式组件]</h2>
      <button onClick={add}>点击</button>
    </div>
  )
}

export default class TestEvent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      num: 1
    }
    // this.add = this.add.bind(this)
  }

  // 自定义事件处理器(event handler)
  // 在JSX中如何访问自定义函数？要用this访问！
  add (step, ev) {
    // console.log('add this', this)
    console.log('add event', ev)
    const { num } = this.state
    this.setState({num: num + (step || 1)})
  }

  skip (ev) {
    ev.preventDefault()
    console.log('a标签已经不跳转了')
  }

  buy (ev) {
    ev.stopPropagation()
    console.log('inner clicked')
  }

  search (ev) {
    if (ev.keyCode === 13) {
      console.log('确定搜索：', ev.target.value)
    }
  }

  render () {
    const { num } = this.state
    return (
      <div>
        <h1>学习事件绑定</h1>
        <h1>{ num }</h1>
        <button onClick={this.add.bind(this, 5)}>点击[ES5]</button>
        <button onClick={(ev)=>this.add(10, ev)}>点击[ES6]</button>
        <hr/>
        <a href="https://baidu.com" onClick={ev=>this.skip(ev)}>百度</a>
        <hr/>
        <input type="checkbox" onClick={ev=>ev.preventDefault()}/>
        <span>测试阻止表单的默认事件</span>
        <hr/>
        <div className='box' onClick={()=>console.log('outer clicked')}>
          <div onClick={ev=>this.buy(ev)}></div>
        </div>
        <hr/>
        <div onMouseEnter={ev=>console.log('鼠标', ev)}>测试鼠标事件</div>
        <hr/>
        <span>名称搜索：</span>
        <input type="text" onKeyUp={ev=>this.search(ev)}  />
        <hr/>
        <span>个人简介：</span>
        <textarea
          cols="30"
          rows="4"
          onBlur={ev=>console.log('失焦：',ev.target.value)}
        />
        <hr/>
        <Child />
        <br/><br/><br/><br/><br/><br/><br/><br/>
      </div>
    )
  }
}
