import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

// 如何使用组合思想来封装这个组件呢？
// - 第一步：思考这个组件由哪几个部分组件？（仁者见仁、智者见智）
// - 第二步：分门别类地把这几个部分封装成小组件。
// - 第三步：借助于props完成对小组件的组合。（组装，相当于搭积木）

const Header = props => {
  // console.log('来自Modal父组件传递过来的props', props)
  const { title, onCancel, closable } = props
  return (
    <div className='header'>
      <div className='title'>{title}</div>
      {
        closable && (
          <div
            className='close'
            onClick={()=>onCancel&&onCancel()}>X</div>
        )
      }

    </div>
  )
}

const Body = props => {
  const { children, tip, onCancel } = props
  return (
    <div className='body'>
      <div>{children}</div>
      { tip && <Footer tip={tip} onCancel={onCancel} /> }
    </div>
  )
}

const Footer = props => {
  const { type, onCancel, onOk, footer, tip } = props
  console.log('footer', props)
  // 如果type='default' 只显示“取消”
  // 如果type='confirm' 显示“取消”和“确定”
  // 如果type='delete' 显示“取消”和“删除”
  const confirmBtn = <span key='1' className='confirm' onClick={onOk}>确定</span>
  const deleteBtn = <span key='2' className='delete' onClick={onOk}>删除</span>
  const cancelBtn = <span key='3' className='cancel' onClick={onCancel}>取消</span>

  const renderBtns = () => {
    let result = null
    switch (type) {
      case 'confirm':
        result = [ confirmBtn, cancelBtn ]
        break
      case 'delete':
        result = [ deleteBtn, cancelBtn ]
        break
      default:
        result = [ cancelBtn ]
    }
    return result
  }
  return (
    <div
      className='footer'
      style={{
        borderTop:`1px solid ${tip?'transparent':'#eee'}`
      }}>
      { footer || renderBtns() }
    </div>
  )
}

// 弹框
const Modal = (props) => {
  console.log('Modal props', props)
  // 这个props是由父组件传递过来的数据、函数、children。

  const { visible, tip } = props

  return (
    <div
      className='layer'
      style={{display: visible?'block':'none'}}
    >
      <div
        className='modal'
        style={{
          width: tip ? '420px' : '520px',
          marginLeft: tip ? '-210px' : '-260px'
        }}
      >
        { !tip && <Header {...props} /> }
        <Body {...props} />
        { !tip && <Footer {...props} /> }
      </div>
    </div>
  )
}

// 给props添加默认值
Modal.defaultProps = {
  title: '标题',
  closable: true,
  type: 'default',
  footer: null,
  tip: false,   // 当tip=true是那种没有Header和Footer的小弹框
}

// 属性类型验证
Modal.propTypes = {
  title: PropTypes.node,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  closable: PropTypes.bool,
  type: PropTypes.oneOf(['default','confirm','delete']),
  onOk: PropTypes.func,
  footer: PropTypes.node,
  tip: PropTypes.bool
}

export default Modal
