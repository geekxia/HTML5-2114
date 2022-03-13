# 环境搭建

- 脚手架create-react-app(v5)，需要注意v5脚手架要求node版本>=14。
- create-react-app的背后，用的是webpack。
```
cnpm i create-react-app -g
create-react-app -V
```

- 如果你需要yarn
```
cnpm i yarn -g
```

- 创建项目（因为网络原因，通常是比较慢的）
```
create-react-app react-project
或者
yarn create react-app react-project
启动项目
cd react-project
npm start
```

- 关于webpack配置文件：create-react-app默认隐藏了webpack的配置文件。但是实际工作中，我们经常需要用到webpack配置，所以怎么才能看到webpack的配置文件呢？
```
git init
git add --all
git commit -m "第一次提交"
npm run eject
输入 y 同意执行eject暴露操作
观察到文件目录eject暴露成功，在命令行使用ctrl+C结束掉进程
cnpm install
npm start
```

# 简单介绍webpack环境

- 当前环境，webpack版本是v5。
- 与webpack有关的配置，在 scripts目录、config目录。如果你需要，你可使劲研究这两个目录，这对学习webpack架构有非常大的帮助。
- 与开发环境有关的配置：改端口、关闭自动打开浏览器功能、修改入口文件、配置代理、添加@别名，等等！
- 当前环境已经集成了对sass样式的支持，你只需要安装 sass 编译器即可。
- 如果你还有兴趣，你可以自行研究 react-dev-utils 这个工具包。

# 状态管理

- 如何理解状态管理？所谓的状态管理，就是对应用程序中的数据进行管理。
- 理念：凡是数据流管理混乱的项目，几乎都上不了线。好的项目，必须有非常良好的数据流管理。

- redux  用于定义Redux数据容器，提供了封装store的核心api。
- react-redux  用于连接Redux和React组件，它是基于上下文、高阶组件、Hooks的封装。
- redux-thunk  用于方便地支持异步数据流。(下周调接口时，再来使用它)
- redux-logger 一个方便我们调试redux数据流的中间件

- 面试题：如何使用Redux？大家记住“3个3”。
  - 第1个三：3个api，createStore、combineReducers、applyMiddleware
  - 第2个三：3个特点，store单一数据源、store只读的、只能通过reducer纯函数来修改store。
  - 第3个三：3个概念，store、action、reducer。
- 面试题：用自己的话描述一下redux的工作流程。


# 静态交互页面设计

- SPA路由系统设计（这其实是一件很难的事）
```
cnpm i react-router-dom@5.3.0 -S
cnpm i @loadable/component -S
cnpm i @babel/plugin-syntax-dynamic-import -D
```

- ant-design组件库的使用（非常重要）
```
cnpm i antd -S
cnpm i @ant-design/icons -S
```
- 如果大家在导入antd样式时出现“热更新很卡”的问题，建议你使用CND的方式引入样式表。

# 项目小结

- 1、脚手架环境问题会解决
- 2、antd风格的组件库的使用，勤翻文档
- 3、redux数据流，异步数据流（那个gif动画）
- 4、hooks编程技巧、自定义Hooks、react-use
