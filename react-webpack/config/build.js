// build.js是打包构建(production环境)所特有的配置

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  mode: 'production',
  // 代码打包，打包出质量更好的代码
  devtool: 'source-map',
  plugins: [
    // 从代码中剥离出css，并将其放在dist/css目录中
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css'
    })
  ],
  module: {
    rules: [
      // 人话：当build打包时，使用sass-loader加载.scss文件，交给sass进行编译；再交给css-loader进行加载，得到css代码；最终交给MiniCssExtractPlugin.loader把css代码写入到.css文件中去，保存在dist目录。
      {
        test: /\.(css|scss)/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  }
}
