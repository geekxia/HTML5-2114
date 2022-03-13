import { defineConfig } from 'umi';

// 这是umi项目的配置文件
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // 创建布局
  layout: {
    siderWidth: 180
  },
  // 基于配置的路由模式
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/good', component: '@/pages/good/index', name:'商品列表', icon:'pie-chart' },
    { path: '/good/detail/:id', component: '@/pages/good/detail' }
  ],
  fastRefresh: {},
  mfsu: {},
  webpack5: {},
  proxy: {},
  // 当umi打包时，给文件添加hash字符串
  hash: true,
  // 这是配置router的模式
  history: { type: 'hash' },
  // dva的背后是：redux、redux-saga
  dva: {
    immer: true,  // 开启immer深拷贝
    hmr: true
  }
});
