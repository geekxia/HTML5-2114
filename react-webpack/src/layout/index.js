import React, { useContext, useState } from 'react'

import {
  Route,
  NavLink,
  Switch,
  Redirect
} from 'react-router-dom'
import routes from '@/views'

import { Provider } from '@/utils/theme'

import { ThemeToggle } from '@/components'
// import { ThemeContext } from '@/utils/theme'

export default props => {
  // const theme = useContext(ThemeContext)
  // const { onChange, value } = props

  const [theme, setTheme] = useState({
    color: '#ff0000',
    background: '#00ff00'
  })

  return (
    <Provider value={theme}>
      <header>
      {
        routes.map(ele=>(
          <NavLink
            style={{padding:'0 20px'}}
            key={ele.id}
            to={ele.path}
            activeClassName='on'
          >
            { ele.text }
          </NavLink>
        ))
      }
      </header>
      <article>
        <Switch>
          {
            routes.map(ele=>(
              <Route
                key={ele.id}
                path={ele.path}
                component={ele.component}
                exact
              />
            ))
          }
          <Redirect from='/*' to='/jsx' />
        </Switch>
      </article>
      <footer>
        <ThemeToggle value={theme} onChange={(ev)=>setTheme(ev)} />
      </footer>
    </Provider>
  )
}
