import React from 'react'
import {
  withRouter,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch
} from 'react-router-dom'

// 学习目标：在这里彻底搞明白JSX的语法。

// 1、两种React组件：class类组件、函数式组件。这两种组件区别很大，为了方便新手学习，我们以类组件为准先开始学习，后面我们再慢慢深入去学习函数式组件。

// 2、什么是JSX？JavaScript XML,它是React团队为了更好编写React代码而创造一种语法糖。JSX并不是React开发必须的，你可以不用。但是，如果你不使用JSX，那么你的代码将难以维护。
// 3、JSX语法所定义的这种代码结构，是变量，是对象，还是不可变对象（你不能直接修改它）。它不是HTML。
// 4、JSX可以更方便地定义视图结构，但是浏览器无法解析JSX的。所以在环境中要使用@babel/core、@babel/preset-react 对JSX语法进行编译，编译成React.createElement()的ES5代码。React.createElement()的返回值是这样的数据结构：{type, props:{children:[]}}

const ele1 = (
  <div id='qf' title='qf'>
    <h1>Hello World</h1>
    <h1>
      <div>Hello 2114</div>
      <a href="https://baidu.com">百度</a>
    </h1>
  </div>
)
// const ele1 = React.createElement(
//   'div',
//   { title: 'qf', id: 'qf' },
//   [
//     React.createElement('h1',{key:1},'Hello World'),
//     React.createElement('h1',{key:2},[
//       React.createElement('div',{key:3}, 'Hello 2114'),
//       React.createElement('a',{href:'https://baidu.com',key:4},'百度')
//     ])
//   ]
// )

// 5、刚强调了JSX是变量，所以当JSX相互嵌套时，如果是变量，要用 {} 包起来。在JSX语法中，JSX元素是可“随意”嵌套的，就像是你在编写HTML标签时的嵌套。
const ele2 = <article>{ ele1 }</article>
const ele3 = <article>{ ele1 } <hr/> { ele1 }</article>

// 6、在JSX语法中，{} 这对花括号，意义非凡。凡是变量，都要使用 {} 包起来。在 {} 中可放哪些东西呢？字符串、数值、表达式、函数调用、JSX变量、布尔值、undefined、null、数组。

// 7、在JSX语法中， {}的计算结果，如果是布尔值、undefined、null，它将渲染成空文本。

const ele4 = <h1>{ 'Hello React' }</h1>
const ele5 = <h1>Hello React</h1>
const ele6 = <h1>{ (1000 + 500) * Math.random() }</h1>
const calTotal = (price, num) => <div title='总价'>{ `总价：${price*num}元` }</div>
const ele7 = <h1>{ calTotal(10, 3) }</h1>
const ele8 = <h1>{ <span>你好</span> }</h1>
const bol = true
const ele9 = <h1>{ !bol }</h1>
const ele10 = <h1>{ (!bol && <span>你好</span>) }</h1>
const ele11 = <h1>{ !bol ? '你好': '你不好' }</h1>

const ele12 = <h1>{ [1,'Hello',false,<span key='11'>再见</span>,null] }</h1>

const grid = () => (
  [
    <div key='a'>
    {[
      <span key='1'>1</span>,
      <span key='2'>2</span>,
      <span key='3'>3</span>
    ]}
    </div>,
    <div key='b'>
    {[
      <span key='4'>4</span>,
      <span key='5'>5</span>,
      <span key='6'>6</span>
    ]}
    </div>,
    <div key='c'>
    {[
      <span key='7'>7</span>,
      <span key='8'>8</span>,
      <span key='9'>9</span>
    ]}
    </div>
  ]
)
const ele13 = <div className='grid'>{ grid() }</div>

// 8、在JSX语法中新增加了三个属性：key用于列表渲染时的优化、ref可以方便地访问DOM对象或组件实例对象、dangerouslySetInnerHTML相当于vue中v-html的功能。

// 9、在JSX语法中有三个属性发生了变化：class->className，for->htmlFor，tabindex->tabIndex。属性名符合小驼峰命名法。

// 10、在JSX语法中，jsx元素的属性可以是静态的，也可以是动态的。如果属性值是动态的，要用 {} 包起来。
const rr = 'red'
const tt = '你好'
const ele14 = <h1 className={rr} title={tt}>你好</h1>
const ele15 = <h1 id={'box'+1}>世界</h1>
const ele16 = <h1 className={`${rr} ${Math.random()>0.5?'f1':'f2'}`}>动态样式</h1>

// 11、关于style属性的特殊性，要注意静态style的写法、还有动态style的写法。需要注意的是，无论静态style，还是动态style，都需要两层{}。第一层{}是JSX语法，第二层{}是“css属性-属性值”的键值对。如果css属性名有多个单词，建议使用小驼峰命名法。

const ele17 = <h1 style={ {color:'red', fontSize:'30px'} }>静态样式</h1>
const cc =  Math.random()>0.5?'red':'blue'
const ele18 = <h1 style={ {color:cc} }>动态样式</h1>

// 12、大家可以放心地使用 {} 语法。JSX默认是支持“XSS防注入攻击”这个Web安全策略的。

function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>
  }
  return <h1>Hello, Stranger.</h1>
}
const ele19 = getGreeting()

// 13、在JSX语法中，如果一个元素的内部没有其它内容，我们可以使用单闭合标签。
const ele20 = <div style={{height:'100px',border:'1px solid red'}} />


class JsxPage1 extends React.PureComponent {

  skipToProps () {
    const { history } = this.props
    console.log('JsxPage1 props', this.props)
    // 路由跳转 history.goBack()/push()/replace()
    history.push('/props?id=100')
    // history.replace('/props')
  }

  render () {
    return (
      <div>
        <h1>学习JSX语法</h1>
        { ele20 }
        <button onClick={()=>this.skipToProps()}>跳转到【学习Props】</button>
      </div>
    )
  }
}

@withRouter
class JsxPage2 extends React.PureComponent {

  skipToProps () {
    const { history } = this.props
    console.log('JsxPage2 props', this.props)
    // 路由跳转 history.goBack()/push()/replace()
    history.push('/props?id=100')
    // history.replace('/props')
  }

  render () {
    return (
      <div>
        <h1>学习JSX语法</h1>
        { ele20 }
        <button onClick={()=>this.skipToProps()}>跳转到【学习Props】</button>
      </div>
    )
  }
}

// 提示：这里除了可以使用路由Hooks来拿取路由API外，还可以使用withRouter
const JsxPage3 = withRouter(
  props => {

    // 坑：所有的Hooks只能是函数式组件顶层作用域中使用，不能在局部函数域中作用。
    const history = useHistory()
    const location = useLocation()
    const match = useRouteMatch('/jsx')
    const params = useParams()

    const skipToProps = () => {
      // console.log('JsxPage3', history, location, match, params)
      history.push('/props')
    }

    return (
      <div>
        <h1>学习JSX语法</h1>
        { ele20 }
        <button onClick={skipToProps}>跳转到【学习Props】</button>
      </div>
    )
  }
)




// 语法：是ES6面向对象的语法
// 定义(封装)一个名字叫TestJSX的组件，继承自React.Component
// 为什么继承？继承的目的得到父组件给的成员方法或成员属性。
export default class TestJSX extends React.Component {
  render () {
    console.log('test jsx props', this.props)
    return (
      <>
        <JsxPage1 {...this.props} />
        <JsxPage2 />
        <JsxPage3 />
      </>
    )
  }
}
