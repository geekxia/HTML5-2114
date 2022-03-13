// serve.js是启动本地服务(development环境)所需要的特有配置

const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  mode: 'development',
  // 当代码报错时，在浏览器控制台显示src中源码位置
  devtool: 'inline-source-map',
  // 配置本地服务器，注意这个配置要先安装webpack-dev-server
  // devServer的默认静态资源目录是 public 目录
  devServer: {
    port: 8080,  // 指定本地开发服务器的端口号
    // open: true,  // 当本地服务运行成功时，自动打开浏览器
    hot: true,   // 开启webpack热更新(HMR=HotModuleReplacement)功能
    client: {
      // 当浏览器覆盖层中只显示error，不显示warning。
      overlay: {
        errors: true,
        warnings: false
      }
    },
    // 配置代理，解决跨域阻塞的问题
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'https://cnodejs.org'
      }
    }
  },
  module: {
    rules: [
      // 用人话：当webpack工作时，如果遇到.css文件，就使用css-loader来加载css文件，交给style-loader将其注入HTML的head标签中。
      // 用人话：当webpack工作时，如果遇到.scss文件，就使用sass-loader加载.scss文件，交给sass编译器进行编译，把编译的css结果交给css-loader进行加载，再进一步交给style-loader将其注入到HTML的head标签中。
      // 注意1：我们在这里用的是webpack(v5)，所以我们可以安装最新的sass-loader(v12)。需要注意的是，在webpack(v4)中是不支持sass-loader(v12)的，你应该安装低版本的sass-loader，比如v10/v8。你想一下，在@vue/cli环境中，就必须得安装低版本的sass-loader。
      // 注意2：css/sass这一堆loader的工作是顺序要求的，谁先工作，谁就写在数组的后面。
      {
        test:/\.(css|scss)$/,
        use:['style-loader','css-loader','sass-loader']
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      // 指定使用eslint这个包来检测代码
      eslintPath: 'eslint',
      // 指定检测哪些文件的规范性
      extensions: ['js','jsx','ts','tsx'],
      // 忽略掉第三方包（不检测）
      exclude: 'node_modules'
    })
  ]
}
