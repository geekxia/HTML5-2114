
// 学习目标：熟练掌握React Hooks编程，并且深入理解各个Hooks API的特点，还要有能力封装自己的Hooks。

// 1、介绍一下React编程(版本)的历史

// - React(v15+) 普通使用class类组件，它的背后有大名鼎鼎的虚拟DOM和Diff运算
// - React(v16) 从v16开始，React背后不再是简单的虚拟DOM了，而最新的Fiber架构
// - React(v16.8+) 从v16.8开始，React新增了Hooks API，这使得Hooks编程成为了可能

// - 注意：在React中，定义组件的方式一直都有两种，一种类组件，另一种函数式组件。

// 2、再次对比类组件和函数式组件

// - 类组件中有state、有this、有上下文、有ref、有生命周期期等各种特性，所以类组件的运行性能较差。
// - 函数式组件没有state、没有this、没有上下文、没有ref、没有生命周期等特性，所以函数式组件的运行性能较好。
// - 无论是类组件，还是函数式组件，有一个共同点，它们都有 props。

// - 结论：在React(v16.8)以前，我们在编写React组件时，会考虑是否要用到state。如果需要用到state，我们就使用类组件；反之，我们定义函数式组件。

// - 结论：随着React(v16.8)越来越普及，现在市场中呈现出“只使用函数式组件”的趋势，类组件越来越少了。但是React函数式组件没有state、没有生命周期等，怎么办？React(v16.8)新增的Hooks弥补了这些问题。

// 终极结论：以后我们编写React组件，都使用函数式组件，不再使用类组件了。当我们需要用到state、上下文和生命周期等特性时，我们使用Hooks API来模拟，这就是我们所谓的“Hooks编程”。

// 3、特别注意：在类组件中，不能使用Hooks API；在React(v16.8)以前，没有Hooks API。只有在React(v16.8)以后、并且只有函数式组件中才能使用Hooks API。

// 4、如何定义React函数式组件呢？

// - 用 function 关键字来定义，或者使用箭头函数来定义，都可以。
// - 需要注意，无论用哪种方式定义函数式组件，组件名的首字母必须大写。

// export default function TestHooks (props) {
//   return (
//     <div>
//       <h1>学习Hooks编程</h1>
//     </div>
//   )
// }

// 5、我们接下来要学习这些Hooks API

// - useState useEffect useContext
// - useMemo useCallback useRef
// - useReducer
// - useLayoutEffect

// 6、【useState】

  // - 作用：用于定义声明式变量，当使用set*方法修改声明式变量时，组件会自动更新。
  // - 语法：const [num, setNum] = useState(初始值)
  // - 为什么这里要用const关键字？避免我们直接修改声明式变量。因为直接修改声明式变量、视图是不会更新的。
  // - 为什么这里用的是数组的解构语法？因为对象解构语法比较“死”，数组解构语法更灵活，我们灵活地指定变量的名字。
  // - useState() 可定义哪些类型的声明式变量呢？基本数据类型、数组和对象，都可以。
  // - 上述数组中的第二个变量是“函数”类型，这个“函数”是修改第一个变量的专属方法，只有通过这个“函数”来修改声明式变量，视图才能自动更新。
  // - 注意：第二个变量“函数”的调用是异步的（你可把它和类组件中this.setState()进行结合思考）；当我们调用第二个变量“函数”时，会触发整个函数式组件重新执行。
  // - 注意：当我们在使用 set* 方法修改声明式变量时，也要考虑“新值和旧值是否有关”。

// 7、函数式组件的运行流程

// - 初始化，函数式组件第一次执行，通过useState()在React底层声明了一系列的声明式变量。
// - 当调用 set* 方法时，这会触发当前函数式组件重新执行，返回新的JSX(新的Fiber树)，进一步执行“协调运算”，找出最小化的脏节点，提交更新视图。

// 8、【useEffect】

  // - 作用：用于执行副作用的，比如调接口、DOM操作、定时器、建立长连接等。
  // 在React函数式式组件中，什么是“副作用”？那些与视图渲染有关的功能逻辑，比如调接口、DOM操作等等。
  // 标准语法：useEffect(()=>{ return ()=>{}}, [依赖数组])
  // 理解：useEffect()是用于模拟类组件中componentDidMount、componentDidUpdate、componentWillUnmount这三个生命周期的。
  // 使用原则：在同一个函数式组件中，可以同时使用多个useEffect；每个useEffect建议只做一件事。（千万不要在一个useEffect中执行多个副作用，因为出现Bug后很难调试）

// 9、useEffect(function fn1() { return fn2}, [依赖数组])

  // - 第一种情况（没有依赖数组这个参数时）：初始化时，fn1执行，fn2不执行；当有人调用set*方法时将进入更新阶段时，fn2先执行，fn1再执行；当组件销毁时，fn2执行，fn1不执行。

  // - 第二种情况（有依赖数组这个参数且为空数组时）：初始化时，fn1执行，fn2不执行；当有人调用set*方法进入更新阶段时，fn2不执行，fn1也不执行；当组件销毁时，fn2执行，fn1不执行。

  // - 第三种情况（有依赖数组这个参数且数组不为空时）：初始化时，fn1执行，fn2不执行；当有人调用set*方法修改的声明式变量在“依赖数组”中时，进入更新阶段时，fn2先执行，fn1再执行；当有人调用set*方法修改的声明式变量不在“依赖数组”中时，fn2不执行，fn1也不执行；当组件销毁时，fn2执行，fn1不执行。


// 10、【useContext】

  // - 作用：我们知道在函数式组件中是没有上下文的，所以useContext()可以帮助我们在函数式组件中使用上下文。
  // - 语法：const ctx = useContext(上下文对象)
  // - 注意：useContext(参数)，这个参数必须是React.createContext()的返回值，不能是Consumer、也不能是Provider。

// 11、【useMemo】

  // - 作用：它相当于是Vue中的计算属性。用于组件中复杂运算的性能优化。
  // - 特点：当它所关联的声明式变量发生变化时，它才会重新运算；反之，它不会重新运行。
  // - 语法：const result = useMemo(fn, [依赖数组])
  // - 解释：有且仅有当“依赖数组”中的声明式变量发生变化时，fn才会重新执行。
  // - 注意：在使用 useMemo()时，要自己根据需求来指定“依赖数组”。

// 12、【useCallback】

  // - 作用：用于定义一个可被缓存的函数。也是一种性能优化的方案。
  // - 语法：const newFn = useCallback(fn, [依赖数组])
  // - 解释：有且仅有当“依赖数组”中的声明式变量发生变化时，fn都会重新执行，返回新的newFn.
  // - 注意: 在使用useCallback()时, 也需要自己灵活地指定"依赖数组".

// 13、【useRef】

  // - 作用: 我们知道在函数式组件中是没有ref的, 所以 useRef 用来模拟类组件中ref功能的.
  // - 定义Ref:  const box = useRef(初始值)
  // - 访问Ref:  box.current
  // - 强调: ref 不仅仅可以快速访问DOM, 还可以访问React组件实例.

// 14、【其它Hooks】

  // - useLayoutEffect 其语法和功能与useEffect几乎相同。区别它们执行的时机不同，useEffect是异步的，当视图渲染完成时才执行；useLayoutEffect是同步的，在视图渲染完成之前就开始执行了。
  // - useReducer 用于在React函数式组件内部模拟Redux状态管理的功能。

// 15、自定义封装Hooks API

  // - 什么是自定义Hooks？用React官方提供的Hooks或者其它的Hooks库，来封装我们自己的Hooks，实现代码逻辑的复用。
  // - 原则: 自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook。
  // - 注意：自定义Hooks是可以复用的。同一个Hooks被复用时，彼此之间是完全独立的，也就是说彼此之间是没有任何干扰的。

// 16、使用第三方Hooks库

  // - 推荐使用 react-use 这个库，它里面有上百个非常好用的Hooks。
  // - 建议大家认真研究一下 react-use，工作中可能帮助你很多。

import React, { useState, useEffect, useContext, useMemo, useCallback, useRef } from 'React'
import { ThemeContext } from '@/utils/theme'
import { useTitle } from '@/hooks'
import { useInterval, useToggle, useFullscreen } from 'react-use'

export default props => {
  // 编写你的代码逻辑
  const [num, setNum] = useState(1)
  const [count, setCount]  = useState(100)

  const theme = useContext(ThemeContext)
  // console.log('上下文theme', theme)

  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')

  console.log('----当前函数式组件，执行了')

  const [list, setList] = useState([])
  const [todo, setTodo] = useState('')

  const box = useRef(null)

  const dom = useRef(null)
  const [show, setShow] = useToggle(false)
  const isFull = useFullscreen(dom, show, {onClose: () => setShow(false)})


  // useEffect(function(){
  //   document.title = '2114'
  //   console.log('DOM执行了')
  //   return function() {}
  // }, [])

  useEffect(()=>{
    // 副作用的逻辑
    // document.title = '2115'
    // console.log('DOM执行了')
    return ()=>{}
  }, [num])

  useEffect(()=>{
    // 这里就相当于是componentDidMount
    return ()=>{
      // 这里就相当于是componentWillUnmount
    }
  }, [])  // 这个[依赖]相当于是componentDidUpdate

  // 定时器的标准写法
  // useEffect(()=>{
  //   const timer = setInterval(()=>{
  //     setCount(count+1)
  //   }, 1000)
  //   return ()=>{
  //     clearInterval(timer)
  //   }
  // }, [count])

  // 使用 react-use 这个Hooks库中 useInterval 来实现定时器
  useInterval(()=>{
    // 下面这些代码，就会在Interval定时器中执行
    setCount(count+1)
  }, 1000)

  useEffect(()=>{
    console.log('fn1执行了')
    return ()=>console.log('fn2执行了')
  }, [list, num])

  const confirm = ev => {
    if (ev.keyCode === 13) {
      // 把表单中的todo添加到list中
      // const newTodo = { id: Date.now(), todo }
      setList([...list, { id: Date.now(), todo }])
      setTodo('')
    }
  }

  // 假如这个计算“全名”的操作很复杂，所以我们在这里计算
  // 当发生“风吹草动”时，下面这行复杂运算会重新，浪费了性能。
  // 解决办法：使用 useMemo()
  const fullname = useMemo(()=>{
    // 在这里编写复杂的计算逻辑
    console.log('fullname被重新计算了')
    return first + ' ' + last
  }, [first, last])


  // 这一个普通函数, 用于渲染视图结构的
  // 这有什么问题呢? 每次发生"风吹草动"时,这个函数都会重新被声明,这显然是一种性能浪费.
  // 解决办法: 使用 useCallback()
  const renderRow = useCallback(() => {
    return <h2>我是一个动态渲染的行: {fullname}</h2>
  }, [first, last])

  // 用useCallback缓存一个事件处理器函数
  const changeColor = useCallback(() => {
    box.current.style.color = 'black'
  }, [])

  // 测试并使用自定义封装的Hooks
  useTitle('你好')

  return (
    <div style={{...theme}}>
      <h1>学习Hooks编程</h1>
      <hr/>
      <h1>{ num }</h1>
      <button onClick={()=>setNum(num-1)}>自减</button>
      <button onClick={()=>setNum(num+1)}>自增</button>
      <hr/>
      任务名称：
      <input
        type="text"
        value={todo}
        onChange={ev=>setTodo(ev.target.value)}
        onKeyUp={confirm}
      /><br/>
      <div>
      {
        list.map(ele=>(<div key={ele.id}>{ele.todo}</div>))
      }
      </div>
      <hr/>
      <h1>{ count }</h1>
      <hr/>

      First Name:
      <input type="text" value={first} onChange={ev=>setFirst(ev.target.value)}/>
      <br/>
      Last Name:
      <input type="text" value={last} onChange={ev=>setLast(ev.target.value)}/>
      <br/>
      你的全名:
      <div>{ fullname }</div>
      <hr/>
      <div>{ renderRow() }</div>
      <hr/>
      <div ref={box}>测试函数式组件中的Ref的使用</div>
      <button onClick={changeColor}>测试</button>
      <hr/>

      <button onClick={()=>setShow()}>全屏</button>
      <div ref={dom}>
        <div>我是一个可以全局的DIV</div>
        <h1>我是一个视频</h1>
      </div>

    </div>
  )
}
