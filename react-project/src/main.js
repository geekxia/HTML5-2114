import React from 'react'
import ReactDOM from 'react-dom'

// 导入antd的样式表（组件库都有样式文件）
// 如果在这里引入antd的样式比较卡，可以使用cdn的方式引入样式表
// import 'antd/dist/antd.css'

import App from './App'
import './assets/style.scss'

// 在这里一般不使用React严格模式
ReactDOM.render(<App />, document.getElementById('root'))
