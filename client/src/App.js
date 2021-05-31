import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { Redirect } from 'react-router'
import './App.css'

// COMPONENTS
import Login from './Login'
import Header from './Header'
import Sidebar from './Sidebar'
import Feed from './Feed/'
import Widget from './Widget'
import Profile from './Profile/'

import db, { auth } from './firebase'
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider'

function UserFeed() {
  return <>
    <Sidebar />
    <Feed />
    <Widget />
  </>
}


function App() {
  const [{ user, initialRender }, dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged(authUser => { 
      if (authUser) {
        const { displayName, email } = authUser

        db.collection('users')
          .where('email', '==', email)
          .onSnapshot(snapshot => {
            if (snapshot.empty) {
              const ref = db.collection('users').doc()
              const id = ref.id
              const newUser = {
                id,
                profilePic: null,
                firstName: displayName,
                lastName: '',
                email: email,
                notifications: {
                  comments: [],
                  reactions: {
                    like: []
                  }
                }
              }

              db.collection('users')
                .doc(id)
                .set(newUser)

              dispatch({
                type: actionTypes.SET_USER,
                user: newUser
              })
            } else {
              const user = snapshot.docs[0].data()
              const userId = snapshot.docs[0].id
              dispatch({
                type: actionTypes.SET_USER,
                user: {
                  id: userId,
                  ...user
                }
              })
            }
          })
      } else {
        dispatch({
          type: actionTypes.SET_USER,
          user: null
        })
      }
    })
  }, [dispatch])

  return (
    <Router>
      <div className="app">
        {initialRender
          ? <></>
          : !user 
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
