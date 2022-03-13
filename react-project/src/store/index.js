
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'  // 用于打印日志
import thunk from 'redux-thunk'    // 用于异步数据流

import study from './modules/study'
import user from './modules/user'
import good from './modules/good'

// 作用：把多个子reducer合并成一个大的reducer
// 思路：在redux中，所谓的拆分子store，实际上就是拆分reducer
// 为什么要拆分？便于协同开发时，代码的可维护。
const reducer = combineReducers({
  study,
  user,
  good
})

// 创建store
const store = createStore(
  reducer,
  // 注意中间件的顺序问题
  compose(
    applyMiddleware(thunk),
    applyMiddleware(logger)
  )
)

export default store
