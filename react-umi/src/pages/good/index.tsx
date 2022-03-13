// import styles from './index.less';

import { history } from 'umi'
import { Button } from 'antd'
import { useState } from 'react'

// 演示TS语法：

const a:String = 'hello'
const b:Number = 200

// 自定义类型
interface Person {
  name: String,
  age: Number,
  addr?: String,
  readonly gender: Boolean
}

interface Person2 {
  mobile: String
}

const Child = (props: Person) => {
  console.log('child props', props)
  return (
    <div>child 组件</div>
  )
}

// 类型别名
type hehe = Number | String | Boolean 
type haha = Person & Person2

const abc: hehe = false
const efg: haha = {
  name: '张三',
  age: 20,
  gender: true,
  mobile: '120'
}

// 终极解决方案：any
const xxx: any = []

export default function() {

  const [num, setNum] = useState<Number>(100)
  const [list, setList] = useState<Array<Person>>([])

  const changeList = () => {
    setList([
      { name:'俊洋',age:10,gender:false,addr:'长沙' },
      { name:'俊洋',age:20,gender:false,addr:'长沙' },
    ])
  }

  const skip = (id: any) => {
    history.push('/good/detail/'+id)
  }

  const c: Person = {
    name: '龙鹏',
    age: 20,
    gender: true,
    addr: '深圳'
  }

  return (
    <div>
      <h1>商品列表页</h1>
      <Button type='primary'>点击</Button>
      {
        [1,2,3].map(ele=>(
          <div key={ele} onClick={()=>skip(ele)}>商品 {ele}</div>
        ))
      }
      <hr />

      <Child {...c} />

    </div>
  );
}
