import React from 'react'
import loadable from '@loadable/component'
import { Loading } from '@/components'

// 动态导入一个页面组件（代码分割）
const TestJSX = loadable(
  ()=>import('./study/12/TestJSX'),
  { fallback: <Loading /> }
)
const TestRender = loadable(
  ()=>import('./study/12/TestRender'),
  { fallback: <Loading /> }
)
const TestProps = loadable(
  ()=>import('./study/12/TestProps'),
  { fallback: <Loading /> }
)

const TestMobx = loadable(()=>import('./study/16/TestMobx'))
const CnodePage = loadable(()=>import('./study/16/CnodePage'))


import TestEvent from '@/views/study/12/TestEvent'
import TestState from '@/views/study/12/TestState'
import TestLifecycle from '@/views/study/12/TestLifecycle'
import TestCondition from '@/views/study/12/TestCondition'
import TestList from '@/views/study/12/TestList'
import TestForm from '@/views/study/12/TestForm'
import TestLift from '@/views/study/14/TestLift'
import TestCombine from '@/views/study/14/TestCombine'
import TestContext from '@/views/study/16/TestContext'
import TestHoc from '@/views/study/16/TestHoc'
import TestHooks from '@/views/study/16/TestHooks'

// 自定义的路由信息数组
export default [
  { id: 1, path: '/jsx', text:'学习JSX', component: TestJSX },
  { id: 2, path: '/render', text: '渲染流程', component: TestRender },
  { id: 3, path: '/props', text: '学习Props', component: TestProps },
  { id: 4, path: '/context', text:'学习上下文', component: TestContext },
  { id: 5, path: '/mobx', text: 'Mobx', component: TestMobx },
  { id: 6, path: '/cnode', text: 'Cnode', component: CnodePage }
]
