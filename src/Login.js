import React from 'react'
import { Button } from '@material-ui/core'
import './Login.css'

import db, { auth, googleProvider } from './firebase'
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider'

function Login() {
  const [state, dispatch] = useStateValue()

  const getUser = async (user) => {
    const { photoURL, displayName, email } = user

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
            email: email
          }
    
          db.collection('users')
            .doc(id)
            .set(newUser)
            .then(() => getUser(user))
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
  }

  const signIn = async (provider) => {
    const authorized = await auth.signInWithPopup(provider)
    getUser(authorized.user)
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
      <Button type="submit" onClick={() => signIn(googleProvider)}>
        Sign In
      </Button>
    </div>
  )
}

export default Login
