import React from 'react'
import { Button } from '@material-ui/core'
import './Login.css'

import { auth, googleProvider } from './firebase'

function Login() {
  const signIn = (provider) => {
    auth.signInWithPopup(provider)
        .catch(error => alert(error.message))    
  }

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
