# 导学：React怎么学？

## 学习目标：大家掌握5种以上React架构

- create-react-app  类组件、Hooks、TypeScript
- dva、umi、ant-design-pro   Hooks、TS
- vite  TS

## React学习方学

- 重基础（万变不离其宗）、
- 有一定架构能力（组件库、路由、状态管理、构建工具）

## 学习成果

- 给你任意一个React项目，你都要有能力跑起来，并且能够看懂代码架构，还能够上手写代码、改需求、解决bug。

## React  vs. Vue 是什么关系？为什么必须学好React？

- 1、vue稳定版是v2（易开发，难维护），目前市场很多公司开始使用v3(vite+typescript)，你需要知道的是vue3.0是借鉴自React 16.8+，在vue3中有很多react影子，所以你学好React，再学vue3会更轻松一些。

- 2、虽然React现在没有vue那么普及，但是react门槛更高，react工程更不招聘，所以react就业更顺畅一些，薪资一般比较高（17K+）

- 3、根据2021年数据统计，react在过去一年，遥遥领先。紧随React步伐，肯定是没有错的。阿里系主推的前端框架就是React。


# Webpack

- 定义：是一个构造工具，在过去五六时间里统治前端工程化一个重要工具。它本质是一个打包器，用于把前端工程化中那些浏览读不懂的代码编译、打包成能够兼容浏览器的静态资源代码。
- 类似的工具还有：gulp、rollup、esbuid、vite。。。
- 版本：现在最新的webpack版本是v5，但是很多公司和脚手架背后用的还是v4。

- 搭建环境的过程
```
mkdir react-Webpack
cd react-webpack
npm init -y
cnpm i webpack -g
cnpm i webpack-cli -g   // -g 全局安装
cnpm i webpack -D
cnpm i webpack-cli -D   // -D 本地安装
```
- webpack 这是webpack的核心代码，它提供了一系列的API和插件。
- webpackc-cli 这是webpack命令行工具，它暴露出一些有用的命令。
- webpack基础：入口、出口、loaders、plugins、devServer等等。

- 怎么理解webpack？你可以认为webpack是榨汁机，把各种原材料丢进行，经过打包，从出口出来。

- 每次使用webpack打包项目时，都应该先清除掉dist目录中的旧文件，以避免文件乱了。那么，该怎么删除dist目录？

- 在vue脚手架中，有一个npm run serve的命令，可以启动本地开发服务，还有热更新等功能。这，在webpack中是如何配置呢？
```
cnpm i webpack-dev-server -g
cnpm i webpack-dev-server -D
```
- 如何启动本地服务：`webpack serve`
- 默认的静态资源服务器目录是： public目录

- 现在已经有了本地服务，public本地服务和src源码，还没有组装起来，怎么办？
```
cnpm i html-webpack-plugin
```
- 在webpack中添加plugins配置，参见配置文件中的代码。

- 如果我们的配置非常多，那么webpack.config.js文件会非常庞大。另一方面，有些配置在开发环境(development)和生产环境(production)是不一样的，需要做区分。该怎么办？
- 做法：在我们自己搭建webpack环境时，一定区分生产环境和开发环境。有以下两种办法来实现：
  - 使用 cross-env 向node环境中添加环境变量，进而在配置文件中通过node代码来进行区分。（在 @vue/cli、create-react-app中都使用到了）
  - 在webpack(v5)中新增了一个命令行选项 --env，可以更加方便地实现生产环境和开发环境的分离。(--env 在v4中是用不了的)

- 当我们把webpack配置拆分成多个文件模块后，如何再合并呢？官方建议 webpack-merge来合并配置文件。（注意：在拆分webpack配置，一定要注意语法问题、路径问题）

- 作业：翻阅webpack文档浏览一篇。今晚很多同学会遇到问题，慢慢研究那么报错。久病成良医。

- 丢包问题：前端工程化需要安装很多依赖包，在工作过程中会“丢包”，建议做法是把node_modules整个目录全部删除，再使用镜像源(淘宝镜像cnpm)重新安装。如果有同学安装依赖失败？通常是网络原因导致包下载失败；还有可能是电脑权限原因导致无法安装全局包。

# Babel编译器

- Babel是一个JavaScript编译器，用于把比较新的JS语法，编译转换成浏览器能够普通兼容的ES5代码。

- 你的JS代码有这么几类：一类是浏览器能读的，一类是浏览器无法读懂的。所以为让环境更加健壮，我们一般在搭建工程化环境时，都需要集成Babel编译器。

- 在webpack中，如何集成使用Babel呢？
```
cnpm i @babel/core -D
cnpm i @babel/preset-env -D
cnpm i @babel/preset-react -D
cnpm i @babel/plugin-proposal-decorators -D
cnpm i @babel/plugin-proposal-class-properties -D
cnpm i babel-loader -D
```
- 在webpack的module.rules添加匹配.js模块的规则
```
{ test: /\.(js|jsx|ts|tsx)$/, use:'babel-loader' }
```
- 在项目根目录创建一个名为 babel.config.js 的Babel配置文件
```
module.exports = { presets: [], plugins: [] }
```

- 简单了解：在当前环境集成React（代码参考src中的代码）
```
cnpm i react -S
cnpm i react-dom -S
```

# 支持样式模块
```
cnpm i css-loader -D
cnpm i style-loader -D
cnpm i sass-loader -D
cnpm i sass -D
```
- 注意：sass-loader和webpack版本之间对应关系。一定要注意sass-loader的版本问题。
- 在webpack的module.rules中添加样式的匹配规则
```
{ test:/\.(css|scss)$/, use:['style-loader','css-loader','sass-loader'] }
```

# 支持图片模块

- 在webpack的module.rules中添加样式的匹配规则
```
{ test:/\.(png|svg|jpg|jpeg|gif)$/, type:'asset/resource' }
```
- 注意：上述写法是webpack(v5)中的新写法，如果在webpack(v4)中，应该像下面这么配置。
```
cnpm i url-loader -D
```
```
{ test:/\.(png|svg|jpg|jpeg|gif)$/, use:'url-loader' }
```

# ESLint代码规范检测工具

- 作用：用于约束咱们写代码的规范，一般只约束JS，不约束CSS等其它代码。
- 问题：在当前环境中如何集成并使用ESLint来检测代码规范呢？

- 下面的做法是webpack(v5)中的做法。
```
cnpm i eslint-webpack-plugin -D
cnpm i eslint -D
```
- ESLint代码检测，只针对开发环境。因为build打包时一般都不会再有语法规范方面的问题。所以ESlint的配置只写在serve中。
- 在代码环境中集成ESlint，也要给它添加配置文件，ESLint有5种方式编写配置文件。
  - .eslintrc.js   这种配置方式，优先级最高
  - .eslintrc.yaml  很少用
  - .eslintrc.yml   很少用
  - .eslintrc.json  很少用
  - package.json   这种配置方式，优先级最低
- 在这里，我们使用.eslintrc.js这种配置方式，在项目根目录中新建这个文件。

- 注意：在webpack(v4)中该如何集成ESlint呢？
```
cnpm install eslint-loader -D
cnpm install eslint -D
```
- 在webpack的module.rules添加一条ESlint检测规则。
```
{ test: /\.(js|jsx|ts|tsx)$/, use:'eslint-loader', include:/src/, enforce:'pre' }
```
- include表示只对我们自己的代码进行规范检测，enforce='pre'表示把这条规则前置，优先检测代码的规范，再使用其它的loader进行加载和编译。

- 作业：阅读webpack文档、babel文档、eslint文档，把代码敲完！

- 小问题：有些代码是vscode中有红线，这是vscode的智能提示，要么你忽略掉，要么把关闭掉。

- 在这里推荐给大家一些好用的ESlint插件（配置参考文档或我们的配置文件）：
```
cnpm i @babel/eslint-parser -D
cnpm i eslint-plugin-react -D
cnpm i eslint-plugin-react-hooks -D
cnpm i eslint-plugin-jsx-a11y -D
```
  - @babel/eslint-parser 它可兼容eslint，配合eslint一起工作，可以检测更多的JS新语法。
  - eslint-plugin-react  用于检测react的语法
  - eslint-plugin-react-hooks  用于检测react hooks语法
  - eslint-plugin-jsx-a11y 用于检测jsx语法

- 如何优雅地解决ESLint的报错问题？
  - 如果eslint报的错是有道理的，我们就老老实实找到指定的代码，把它修复正确。
  - 如果我觉得这条校验规则过分了，我们可以把这条规则关闭掉。
  - 使用ESlint注释来忽略对代码的校验。我们可以使用`/*eslint-disable*/ /eslint-enable/``//eslint-disable-line`在代码忽略ESLint检测。
  - 在项目根目录中添加 .eslintignore 文件，忽略指定的文件或目录的代码检测。

- 结论：在公司上班时，如果遇到ESlint报错，你用哪种方式解决呢？在不影响别人的情况，你想怎么解决就怎么解决。

# Webpack扩展

- 研究Webpack环境架构：webpack官网、babel官网、eslint官网。多翻多看，遇到你觉得好玩的功能，你自己加上去，试一试，测一测。

- 添加devtool属性，对两个环境分别指定不同的调试属性。尤其是serve环境中，devtool='inline-source-map'，在build时devtool='source-map'。

- 当项目打包上线，我们希望剥离出css代码，不要使用DOM方法把style插入html中去。建议使用 mini-css-extract-plugin 这个插件来实现，怎么用？参考它的文档。

- 当项目打包上时，我们希望css文件、js文件、img文件，都能够分门别类地放在指定的目录中，在输出的filename字段添加目录前缀。
  - 对js文件来讲，在output.filename上添加目录前缀。
  - 对css文件来讲，在MiniCssExtractPlugin这个插件的filename上添加目录前缀。
  - 对图片文件来讲，在rule.generator.filename上添加目录前缀。

- 有些文件模块或第三方包，在多个文件中都有使用过。我们希望build打包时，能够把这些公共包提取到一个单独的.js文件中去，这个单独的.js文件就叫做“vendor”。比如，在React项目中，我们要把react、react-dom这样的包，提取成vendor。
```
entry: {
  vendor: ['react', 'react-dom'],
  app: { import: '../src/main.js', dependOn: 'vendor' }
}
```

# 集成React

- 为什么要在这里学习React呢？就是希望大家能够意识到：环境也是开发一部分，如果连环境的基本问题都搞不定，那么你就不是一个合格的前端。当然还有更重要，因为webpack很重要，是架构能力的一部分。

- 提示：如果有同学已经很努力了，但是还是搞不定环境。怎么办？先把我的代码拿去，先用着，免得耽误了React学习。

- 简介：是Facebook开源的一个MVVM框架(库)，支持在虚拟DOM层上渲染数据，也支持组件化。
```
cnpm i react -S
cnpm i react-dom -S
```
- react(v17) 这是React核心API的包。
- react-dom(v17) 它用于把React元素渲染成真实的DOM结构。

- 作业：把今天的代码敲完、自己整理笔记；自己预习React文档。(文档永远是最好的学习资源)


# react-router-dom

- 版本：v5 和 v6，在企业中几乎都还在使用v5，所以我们学习还是学v5。v6是2021年年底发布的，变化还是非常大的，我们不讲，有兴趣的同学去到公司再自行学习。
- v6官网：https://reactrouter.com/
- v5官网：https://v5.reactrouter.com/web/guides/quick-start
- React Router 路由的特点：是基于React上下文、高阶组件、Hooks来封装的库，它是组件化。路由的使用还是比较简单的，但是使用路由设计Web系统却是一件难事。

- 如何理解SPA单页面应用程序？本质上，SPA单页面应用程序是离不开路由系统的，当路由切换时，实际上是组件的销毁与创建。

- 关于路由使用还是比较简单的，但是如果要搭建一个健壮的路由系统还是很困难的。

- 基本使用（安装时要指定v5）
```
cnpm i react-router-dom@5.3.0 -S
```
- 常用组件：<HashRouter> <Route> <Link> <Switch> <Redirect>。。。
- 常用API：withRouter、useHistory、useLocation、useParams。。。
- Switch，一般用于把所有的Route包裹起来，作用是可以加快路由匹配的速度；但需要注意的是，Switch必须是Route直接父组件。
- Redirect，实现重定向。要注意结合 Route的exact属性灵活使用。

- 代码分割
  - 什么是代码分割？当webpack打包单页面应用程序时，为了避免最终的js文件体积太大，我们需要借助于“动态导入”技术来实现代码分割，也就是说把最终那个较大的js文件分割成多个小的js文件。
  - 在React架构中，具体该如何实现代码分割？官方推荐使用 @loadable/component 从路由设计的角度来实现代码分割。还要安装支持“动态导入”语法的Babel插件，参见babel.config.js文件。

- 关于路由API(history/match/location)的说明
  - 结论：那些被Route直接作用过的React组件，其props上有路由API；那些没有被Route作用过React组件，其props上是没有路由API的。
  - 问题：如果某个React组件的props上没有路由API，但我们又得用到路由API，怎么办？
  - 三种解决方案：
    - 通过“属性继承”语法，把props路由API传递给那些没有路由API的组件。如果组件嵌套层级太深，使用“属性继承”语法就比较麻烦了。
    - 使用 withRouter 这个高阶组件来获取路由API。
    - 使用 路由Hooks 来访问路由API。需要注意的是，路由Hooks只能用在函数式组件中，不能在类组件中使用。

# 状态管理

- 在React中常用的状态管理工具有两个：mobx、redux。前者比较适合在中小型项目中使用，其使用极其简单。后者比较适合在中大型项目中使用，其数据架构更加严格。
- 今天，先学习 mobx 状态管理。

- 状态管理工具的作用：用于组件之间数据共享；用于数据缓存。
- mobx：用于封装状态管理容器，你可以把它理解一个数据容器。
- mobx-react：用于连接mobx和react组件，你可以理解成通过mobx-react来使用mobx数据。

- 两个常用的版本：【新】mobx(v6)+mobx-react(v7)；【旧】mobx(v5)+mobx-react(v6)。特别注意：现在公司普遍都在使用【新mbox架构】，【旧mobx架构】也能遇得到。
```
cnpm i mobx -S
```

- 使用mbox-react连接数据容器和React组件
```
cnpm i mobx-react -S
```
- <Provider> 它可以帮助我们把mobx数据注入到React组件的上下文。
- inject()()  这是一个高阶组件，帮助我们在React组件中使用mobx在上下文里的数据。
- observer() 这也是一个高阶组件，作用是观察mobx数据的变化，当mobx数据变化时，触发当前React组件自动更新视图。(这就是我们所谓的“mobx响应式”)
