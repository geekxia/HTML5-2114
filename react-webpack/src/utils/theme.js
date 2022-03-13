import React from 'react'

// 创建一个上下文组件
const ThemeContext = React.createContext()

const { Provider, Consumer } = ThemeContext

export {
  Provider,  // 向React组件树中“提供”(注入)数据
  Consumer,  // 从React组件树中“消费”(使用)数据
  ThemeContext
}
