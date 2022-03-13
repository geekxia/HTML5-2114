// common.js用于编写开发环境和生产环境都需要的相同配置

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口：打包构建项目时的入口文件
  // entry: '../src/main.js',
  // entry: path.resolve(__dirname, '../src/main.js'),
  entry: {
    // 给入口文件加了一个名字，在output中使用 [name] 可以访问到它
    // app: path.resolve(__dirname, '../src/main.js')

    // 提取vendor公共依赖
    vendor: ['react', 'react-dom'],
    app: {
      import: path.resolve(__dirname, '../src/main.js'),
      dependOn: 'vendor'
    }
  },
  // 出品：打包构建项目完成的输出配置
  output: {
    path: path.resolve(__dirname, '../dist'),
    // 为什么在要output输出的文件上添加hash值呢？那什么又是chunkhash呢？
    // 当前端应用程序打包上线时，要给每个文件添加chunkhash。特点：如果被打包的文件发生更新，打包时其chunkhash就会变化；反之，如果被打包的文件模块没有代码更新，那么chunkhash就不会变。好处，当项目部署上线线，浏览器可以避免因为缓存而导致的代码不更新问题。
    filename: 'js/[name].[chunkhash].js',
    // 每次打包时，自动清除dist目录
    clean: true
  },
  // 使用插件
  plugins: [
    // 当编译代码或打包构建时，在命令行中显示编译或打包的进度
    new webpack.ProgressPlugin(),
    // 当运行本地服务时，使用该插件自动完成public/index.html和src/main.js的组装
    new HtmlWebpackPlugin({
      // 指定webpack入口文件和哪些html文件进行组装
      template: path.resolve(__dirname, '../public/index.html'),
      // 打包时，把script标签插入在body结束标签之前，而不是放在head中。
      inject: 'body'
    })
  ],
  // 什么是loaders？在webpack的眼中一切文件皆模块，webpack要使用合适的loader来加载这个不同的文件模块，进一步交给相关的编译器进行代码编译。常用的loaders有以下这些：
  // vue-loader 用于加载.vue模块，并交给vue编译器进行编译
  // babel-loader 用于加载.js/.jsx/.ts/.tsx模块，并交给Babel编译器进行编译
  // sass-loader 用于加载.scss文件模块，并交给sass进行编译
  // 为什么这个属性是module而不是loaders？原因在webpack眼中一切皆模块。
  module: {
    rules: [
      // 用人话来解释这条规则：当webpack工作，如果遇到.js结尾的模块，就使用babel-loader加载，然后交给Babel系列编译器进行编译。
      // Babel编译器在哪里？答案：Babel编译器需要在babel.config.js中进行若干配置。
      // 对JS模块来讲，粗略地可以分为两类：一类是我们自己编写的.js模块，一类是第三包中的.js模块。需要注意的是：第三方包中的.js模块大多都是编译过的，在这里无须再编译；对我们自己编写的.js模块文件，才需要进行编译。
      // exclude  指定不解析的目录
      // include  指定要解析的目录
      { test:/\.(js|jsx|ts|tsx)$/, use:'babel-loader', include:/src/ },

      // 用人话：支持在webpack环境import图片模块，下面这个写法webpack(v5)的新写法。
      // 如果webpack(v4)，要安装url-loader加载图片模块，并返回图片的访问路径。
      {
        test:/\.(png|svg|jpg|jpeg|gif)$/,
        type:'asset/resource',
        generator: {
          filename: 'imgs/[name].[hash][ext]'
        }
      }
    ]
  },
  // 解析配置
  resolve: {
    // 一般前端写代码，省略后缀只针对JS模块
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
    // 别名，这里的 @ 代表的是当前项目的 src根路径
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  }
}
