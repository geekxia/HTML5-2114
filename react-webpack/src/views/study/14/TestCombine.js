import React, { PureComponent } from 'react'

// 学习目标：非常熟练地使用组合这种设计模式的思想，封装我们需要的组件。组合，是React组件化的基础。

// 1、什么组合(设计模式)？

// 在React组件化中，当我们要封装一个组件时，我们的思路是先拆解这个组件由哪几个部分组成，然后分门别类地封装一些小组件，再把这些小组件组合成一个大的组件。

// 所谓我们经常说“前端界面就像搭积木”，说的就是组合。


// 2、组合的语法基础

// - render props，我们知道props可以传递JSX元素，借助props来完成视图的渲染。
// - props.children，它表示自定义组件内部嵌套的子节点，也可以参与组件的视图渲染。

// 3、关于props和state

// - 结论：在React中，使用props的场景比state更多，所以props的使用是更复杂的、更容易出Bug。
// - 类比：state是组件自己的状态数据，props会涉及到组件之间的数据传递。state是自己和自己相处，比较单纯；props是人际关系，比较累。

// 4、再次强调“组合”与“继承”（官方推荐使用“组合”来实现代码复用）

// - 如果是使用“继承”来封装组件，代码将呈现这个样子：
//   class Modal extends Component {}
//   class BigModal extends Modal {}
//   class SmallModal extends Modal {}
//   class DeleteBigModal extends BigModal {}
//   class DeleteSmallModal extends SmallModal {}

// - 使用“组合”封装组件，将大大提升代码的质量。
  // 通过props控制，能够得到3种不同的 Header
  // 通过props控制，能够得到2种不同的 Body
  // 通过props控制，能够得到5种不同的 Footer
  // 问题：那么我们通过组合能够得到多少种不同的Modal呢？(3*2*5=30种)

import Modal from './modal'

export default class TestCombine extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  click () {
    this.setState({visible: true})
  }
  submit () {
    setTimeout(()=>{
      // 点击“确定”或“删除”时调接口
      // 调接口成功后，关闭弹框
      console.log('确定提交，提交成功')
      this.setState({visible: false})
    }, 200)
  }
  render () {
    const { visible } = this.state
    return (
      <div>
        <h1>学习组合</h1>
        <hr/>
        <Modal
          visible={visible}
          onCancel={()=>this.setState({visible:false})}
          title={<span style={{color:'red'}}>海文</span>}
          closable
          type='delete'
          onOk={()=>this.submit()}
          footer={<span className='delete'>辞退</span>}
          tip
        >
          {/*
            <div>
              用户名：<input type="text"/><br/>
            </div>
            <div style={{marginTop:'15px'}}>
              手机号：<input type="text"/>
            </div>
          */}
          <img style={{width:'50px',height:'50px'}} src="//img30.360buyimg.com/seckillcms/s140x140_jfs/t1/209753/3/9491/156334/6193532bE9dc03381/0d3d0859bf8e6eb5.jpg.webp" />
        </Modal>
        <button onClick={()=>this.click()}>点击</button>
        <hr/>
      </div>
    )
  }
}
