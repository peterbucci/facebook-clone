import React from "react";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";
import "App.css";
// VIEWS
import Login from "views/Login";
import UserFeed from "views/UserFeed/";
import Profile from "views/Profile";
// FRAGMENTS
import Header from "components/Header";
// STATE
import { useStateValue } from "providers/StateProvider";

function App() {
  const {
    state: { user },
  } = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
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
      )}
    </div>
  );
}

export default App;
