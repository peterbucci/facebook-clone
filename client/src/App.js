import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { Redirect } from 'react-router'
import './App.css'
// VIEWS
import Login from './views/Login'
import UserFeed from './views/UserFeed/'
import Profile from './views/Profile'
// FRAGMENTS
import Header from './fragments/Header'
// STATE
import { useStateValue } from './providers/StateProvider'

function App() {
  const { state: {user} } = useStateValue()

  return (
    <Router>
      <div className="app">
        {!user 
            ? <Login />
            : <>
              <Header />
              <div className="body">
                <Switch>
                  <Route path="/me">
                    <Redirect to={`/${user.url}`} />
                  </Route>
                  <Route path="/:profileURL" component={Profile} />
                  <Route path="/" component={UserFeed} />
                </Switch>
              </div>
            </>
        }

      </div>
    </Router>
  )
}

export default App;
