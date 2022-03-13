import { useState } from 'react'

import { Layout } from 'antd'
import './style.scss'

import QfHeader from './QfHeader'
import QfSider from './QfSider'
import QfContent from './QfContent'

const { Header, Footer, Sider, Content } = Layout

export default () => {

  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout>
      <Sider collapsed={collapsed}>
        <QfSider value={collapsed} onChange={()=>setCollapsed(!collapsed)} />
      </Sider>
      <Layout>
        <Header>
          <QfHeader />
        </Header>
        <Content>
          <QfContent />
        </Content>
      </Layout>
    </Layout>
  )
}
