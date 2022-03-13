// 这是ESlint最高优先级的配置文件

module.exports = {
  // parser默认是eslint。在这里我们将其修改为@babel/eslint-parser作为解析器
  // @babel/eslint-parser这个包，你可以理解是eslint + babel-eslint的结合体
  // 现在这个parser功能更强大，我们推荐使用它代替掉eslint这个默认的解析器
  parser: "@babel/eslint-parser",
  // 用于配置解析选项
  parserOptions: {
    ecmaVersion: 6,  // 兼容支持ES6代码检测
    sourceType: "module", // 支持模块化
    ecmaFeatures: {
        jsx: true   // 开启JSX语法检测
    }
  },
  // 添加一些扩展的ESLint
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  plugins: [
    "react",
    "react-hooks",
    "jsx-a11y"
  ],
  // 用于配置检测规则（“法律法规”）
  // 校验规则的三种级别：error/2 表示“如果违反规则就报错”；warn/1 表示“如果违反规则只给警告”；off/0 表示“关闭掉这条规则”。
  // 期望：在浏览器的报错覆盖层中只显示error错误，不显示warn警告。
  rules: {
    "no-undef": 0,
    "semi": 0,  // 0-"off"  1-"warn"  2-"error"
  }
}
