/* eslint-disable  */
import React, { PureComponent, useState } from 'react';
import '@/assets/style.scss'
/* eslint-enable  */

import { HashRouter, BrowserRouter } from 'react-router-dom'
import Layout from '@/layout'

// mobx
import { Provider } from 'mobx-react'
import store from '@/store'

// 这里是React根组件，在根组件中渲染页面组件
const App = () => {

  return (
    <HashRouter>
      <Provider {...store}>
        <Layout />
      </Provider>
    </HashRouter>
  )
}

// eslint-disable-next-line
export default App
