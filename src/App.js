import React, { useEffect } from 'react'
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

import db, { auth } from './firebase'
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider'

function App() {
  const [{ user }, dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged(authUser => { 
      if (authUser) {
        const { photoURL, displayName, email } = authUser

        db.collection('users')
          .where('email', '==', email)
          .onSnapshot(snapshot => {
            if (snapshot.empty) {
              const ref = db.collection('users').doc()
              const id = ref.id
              const newUser = {
                id,
                profilePic: photoURL,
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
              dispatch({
                type: actionTypes.SET_USER,
                user: {
                  id: snapshot.docs[0].id,
                  ...snapshot.docs[0].data()
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
