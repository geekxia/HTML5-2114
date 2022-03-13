import { HashRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from '@/store'

import Dashboard from '@/dashboard'

// 导入antd中文语言包
import zhCN from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'

import GoodList from '@/views/good/GoodList'

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <ConfigProvider locale={zhCN}>
          <Dashboard />
        </ConfigProvider>
      </Provider>
    </HashRouter>
  )
}

export default App
