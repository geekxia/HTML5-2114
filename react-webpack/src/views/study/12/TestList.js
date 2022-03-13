import React, { PureComponent } from 'react'

// 学习目标：熟练掌握列表渲染的写法。

// 列表渲染的语法基础：JSX默认就支持对数组的渲染 { [true,jsx,null] }。
// 注意：在渲染列表时，React官方并不推荐使用for循环、forEach等；官方推荐使用map()循环。这是为什么呢？是因为map()更好用，它的返回值默认就是数组类型，这非常方便。
// 注意：列表渲染时，一定要加Key，这是一种性能优化的方案。

export default class TestList extends PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      userList: [
        { id: 1, name: '刘广生', age: 20 },
        { id: 2, name: '苏清', age: 30 },
        { id: 3, name: '邓丽', age: 40 },
        { id: 4, name: '姚碧云', age: 50 }
      ]
    }
  }

  userListRender1 () {
    const { userList } = this.state
    let result = []
    // 注意：react官方并不推荐使用非map()的其它循环方法。
    userList.forEach(ele=>{
      const user = (
        <div key={ele.id}>
          <span>姓名：{ele.name}</span>
          <span style={{paddingLeft:'20px'}}>年龄：{ele.age}</span>
        </div>
      )
      result.push(user)
    })
    return result
  }

  userListRender2 () {
    const { userList } = this.state
    // 注意：react官方推荐使用map()来渲染列表。
    return userList.map(ele=>(
      <div key={ele.id}>
        <span>姓名：{ele.name}</span>
        <span style={{paddingLeft:'20px'}}>年龄：{ele.age}</span>
      </div>
    ))
  }

  render () {
    const { userList } = this.state
    return (
      <div>
        <h1>学习列表渲染</h1>
        <hr/>
        { this.userListRender1() }
        <hr/>
        { this.userListRender2() }
        <hr/>
        {
          userList.map((ele,idx)=>(
            <div key={ele.id}>
              <span>{idx}</span>
              --
              <span>{ele.name}</span>
              --
              <span>{ele.age}</span>
            </div>
          ))
        }
      </div>
    )
  }
}
