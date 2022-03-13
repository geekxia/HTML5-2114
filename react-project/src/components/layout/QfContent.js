import { Route, Switch, Redirect } from 'react-router-dom'
import routes from '@/views'

const renderRoutes = () => {
  let result = []
  routes.map(ele=>{
    ele.children.map(ele=>{
      result.push(
        <Route
          key={ele.id}
          path={ele.path}
          component={ele.component}
        />
      )
    })
  })
  return result
}

export default () => {
  return (
    <div className='qf-content'>
      <Switch>
        { renderRoutes() }
        <Redirect from='/*' to='/analyse' />
      </Switch>
    </div>
  )
}
