import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { Redirect } from "react-router";
import "App.css";
// VIEWS
import Login from "views/Login";
import UserFeed from "views/UserFeed/";
import Profile from "views/Profile";
import Photo from "views/Photo";
// FRAGMENTS
import Header from "components/Header";
// STATE
import { useStateValue } from "providers/StateProvider";

function App() {
  const { state } = useStateValue()
  const { user, users } = state
  const currentUser = users[user]

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <div className="body">
            <Switch>
              <Route path="/photo" component={Photo} />
              <Route path="/me" >
                <Redirect to={`/${currentUser.url}`} />
              </Route>
              <Route path="/:profileURL" component={Profile} />
              <Route path="/" component={UserFeed} />
            </Switch>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
