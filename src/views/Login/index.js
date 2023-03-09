import React from "react";
import { Button } from "@material-ui/core";
import "./styles/login.css";

import { auth, googleProvider } from "firebase.js";

export default function Login() {
  const signIn = (provider) => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__logo">A Facebook Clone</div>
      <Button type="submit" onClick={() => signIn(googleProvider)}>
        Sign In
      </Button>
    </div>
  );
}
