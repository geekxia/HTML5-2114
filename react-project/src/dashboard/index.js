import { useEffect } from 'react'

import { Route, Switch, useHistory, useLocation } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { Login, Layout } from '@/components'

export default () => {

  const history = useHistory()
  const { pathname } = useLocation()

  const token = useSelector(state=>state.user.token)
  // 如果用户未登录，在这里显示Login组件
  // 如果用户已登录，在这里显示Layout组件

  useEffect(()=>{
    // 如果没有token，表示你没有登录，就跳转到登录页
    if (!token) history.replace('/login')
  }, [])

  useEffect(()=>{
    // 登录成功后，跳转到系统的首页
    if (token && pathname==='/login') history.replace('/analyse')

    // 在真实工作中，这里还缺少一个步骤
    // 登录成功只是得到了token，还未能得到用户信息（用户角色？？）
    // 所以，在未知用户角色之前，是不能盲目跳转到内部系统的
    // 那该怎么办？
    // 在登录成功后，用token调接口，先获取用户信息，再根据用户信息来显示当前用户有权看到的菜单（这就是我们常说的权限管理）。
    // 结论：必须先获取用户信息，才能进入内部系统。
  }, [token])

  return (
    <>
      <Switch>
        <Route path='/login' component={Login} />
        {/* 这里的 path='/'，这是为什么？ */}
        <Route path='/' component={Layout} />
      </Switch>
    </>
  )
}
