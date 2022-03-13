// webpack的默认配置文件就是webpack.config.js
// webpack配置文件的语法是：CommonJS，可以使用JS、NodeJS。

const { merge } = require('webpack-merge')

// 为什么要区分两种不同的环境？便于webpack配置项的维护！
const common = require('./config/common')
const serve = require('./config/serve')
const build = require('./config/build')

// 注意：一个正确的webpack配置文件，至少得有入口和出口。
module.exports = function({development}) {

  // const { development, production } = env

  // 如果development为真，就是开发环境， 你正在 npm run serve
    // 把 common 和 serve 合并起来，并返回
    // config = development && merge(common, serve)
  // 如果production为真，就是生产环境，你正在 npm run build
    // 把 common 和 build 合并起来，并返回
    // config = production && merge(common, build)

  // 问题：如何合并这些配置选项？推荐一个大名鼎鼎的工具 webpack-merge

  // 这个函数的返回值，就是webpack配置项
  return merge(common, development?serve:build)
}
