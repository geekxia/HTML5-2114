import { useState } from 'react'

import { Menu, Button } from 'antd'

import {
  AppstoreOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,

  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'

import logo from '@/assets/logo.png'

import routes from '@/views'
import { Link } from 'react-router-dom'

const { SubMenu } = Menu

const Logo = () => (
  <div className='qf-logo'>
    <img src={logo} alt="qf"/>
  </div>
)

const Toggle = ({value, onChange}) => (
  <div className='qf-toggle' onClick={onChange}>
  { value ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> }
  </div>
)

export default props => {

  return (
    <div className='qf-sider'>
      <Logo />
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
      >
      {
        routes.map(ele=>(
          <SubMenu key={ele.id} icon={ele.icon} title={ele.text}>
          {
            ele.children.map(ele=>(
              !ele.notMenu &&
              <Menu.Item key={ele.id}>
                <Link to={ele.path}>{ ele.text }</Link>
              </Menu.Item>
            ))
          }
          </SubMenu>
        ))
      }
      </Menu>
      <Toggle {...props} />

    </div>
  )
}
