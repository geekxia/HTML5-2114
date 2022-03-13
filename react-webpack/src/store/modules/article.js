// 在这里定义mobx子容器（也推荐使用ES6语法）
// 强调：一个状态容器，要有响应式变量，还要有可以用来修改响应式数据的方法。

import {
  makeObservable,
  observable,
  action,
  makeAutoObservable
} from 'mobx'


// - observale 用于修饰一个变量，将其变成响应式数据
// - action 用于修饰一个方法，表明这个方法可以用来修改声明式变量，即一个“行为”。

// - makeAutoObservable 可以自动地把成员属性变成响应式变量，把成员方法变成action。

export default class Article {
  constructor () {
    // 初始化
    // makeObservable(this, {
    //   count: observable,
    //   add: action
    // })
    makeAutoObservable(this)
  }
  count = 1
  add (step) {
    this.count += step
    // console.log('new count', this.count)
  }
}
