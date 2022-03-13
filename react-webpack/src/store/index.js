// 在这里定义mobx根容器（推荐使用ES6语法）

import Article from './modules/article'
import Cnode from './modules/cnode'

class Store {
  constructor() {
    // 合并mobx子容器
    this.article = new Article()
    this.cnode = new Cnode()
  }
}

// 创建store实例对象，并抛出
const store = new Store()
export default store
