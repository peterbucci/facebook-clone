import React from 'react'
import { Button } from '@material-ui/core'
import './Login.css'

import db, { auth, provider } from './firebase'
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider'

function Login() {
  const [state, dispatch] = useStateValue()

  const getUser = (user) => {
    console.log(user)
    return db.collection('users')
      .where('userId', '==', user.uid)
      .get()
      .then(querySnapshot => {
        console.log('snap', querySnapshot.empty)
        return querySnapshot.empty
          ? db.collection('users').add({
            userId: user.uid,
            profilePic: user.photoURL,
            firstName: user.displayName,
            lastName: '',
            email: user.email
          })
          .then(({ id }) => {
            return {
              id,
              userId: user.uid,
              profilePic: user.photoURL,
              firstName: user.displayName,
              lastName: '',
              email: user.email
            }
          })
          .catch(error => alert(error.message))
          : {
            ...querySnapshot.docs[0].data()
          }
      })
      .catch(error => alert(error.message))
  }

  const signIn = () => {
    auth.signInWithPopup(provider)
      .then(result => {
        // Create a users collection. If a user exists with the UID use that otherwise, create one with the result
        getUser(result.user)
          .then(user => {
            dispatch({
              type: actionTypes.SET_USER,
              user
            })
          })
      })
      .catch(error => alert(error.message))
  }

  console.log(state)

  return (
    <div className="login">
      <div className="login__logo">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png" 
          alt="facebook logo icon"
        />
        <img 
          src="https://www.logo.wine/a/logo/Facebook/Facebook-Logo.wine.svg"
          alt="facebook logo text"
        />
      </div>
      <Button type="submit" onClick={signIn}>
          Sign In
        </Button>
    </div>
  )
}

export default Login
