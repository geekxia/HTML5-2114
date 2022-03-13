// 这是Babel(v7)的配置文件，用于告诉Babel环境该如何工作。

module.exports = {
  // preset预设。什么是预设？指的是比较大的JS语法版本，比如TypeScript、JSX、ES6等。
  // @babel/core 这是不预设，它是Babel编译器的核心代码
  // @babel/preset-env 这是ES6语法版本的编译器
  // @babel/preset-react 这是JSX语法版本的编译器
  // @babel/preset-typescript 这是TS语法版本的编译器
  presets: [
    // 注意：@babel/preset-env能够编译大多数已被收录的ES6语法，但ES6装饰器语法不包括在内。所以像这种特殊的ES6等语法，我们要配置plugins来编译这些特殊语法。
    ['@babel/preset-env', {}],
    ['@babel/preset-react', {}]
  ],
  plugins: [
    // 下面这两个Babel插件可以用来编译ES6装饰器语法
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties"],
    // 为了支持js的动态导入语法：()=>import('xxx.js')
    ["@babel/plugin-syntax-dynamic-import"]
  ]
}
