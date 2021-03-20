import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import './App.css'

// COMPONENTS
import Login from './Login'
import Header from './Header'
import Sidebar from './Sidebar'
import Feed from './Feed/'
import Widget from './Widget'

import { useStateValue } from './StateProvider'

function App() {
  const [{ user }] = useStateValue()

  return (
    <Router>
      <div className="app">
        {!user 
          ? <Login />
          : <>
            <Header />

            <div className="app__body">
              <Switch>
                <Route path="/users">
                  <UserProfile />
                </Route>
                <Route path="/">
                  <UserFeed />
                </Route>
              </Switch>
            </div>
          </>
        }

      </div>
    </Router>
  )
}

function UserFeed() {
  return <>
    <Sidebar />
    <Feed />
    <Widget />
  </>
}

function UserProfile() {
  return <h2>Test</h2>
}

export default App;
