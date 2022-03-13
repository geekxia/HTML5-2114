// 在咱们这个环境中，用到了JSX语法。JSX会被Babel编译成React的ES5代码。
// Babel在编译JSX时，会使用到 React.createElement()这个API，所以必须要导入React。
import React from 'react'
// ReactDOM封装了很多DOM方法，用于把react元素渲染到浏览器中。
import ReactDOM from 'react-dom'
// App是根组件，React组件名字必须符合“大驼峰命名法”(首字母必须大写)
// 组件模块的文件后缀可以是：.js/.jsx/.ts/.tsx(只有当前环境支持TS时才能使用.ts/.tsx)
import App from './App'

// App是React组件(React类)，app是React元素(jsx元素、组件实例)
// 理解：从App组件到app元素的过程，你可以理解是组件的实例化过程（生命周期）
const app = <App />

// 把App组件渲染到一个id=root的DOM节点
ReactDOM.render(app, document.getElementById('root'))
