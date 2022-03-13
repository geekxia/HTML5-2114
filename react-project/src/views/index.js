import loadable from '@loadable/component'

import {
  ShoppingOutlined
} from '@ant-design/icons'

// 代码分割
const Analyse = loadable(()=>import('./analyse'))
const GoodList = loadable(()=>import('./good/GoodList'))
const GoodForm = loadable(()=>import('./good/GoodForm'))


export default [
  {
    id: 10,
    text: '商品管理',
    icon: <ShoppingOutlined />,
    children: [
      {
        id: 1001,
        text: '商品列表',
        path: '/good/list',
        component: GoodList
      },
      {
        id: 1002,
        text: '商品新增',
        path: '/good/add',
        component: GoodForm,
        notMenu: true,   // 不放在Menu上
      },
      {
        id: 1004,
        text: '商品编辑',
        path: '/good/edit/:id',  // 动态路由
        component: GoodForm,
        notMenu: true,
      },
      {
        id: 1003,
        text: '数据分析',
        path: '/analyse',
        component: Analyse,
        notMenu: true
      }
    ]
  }
]
