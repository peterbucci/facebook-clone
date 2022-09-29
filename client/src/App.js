import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { Redirect } from "react-router";
import "App.css";
// VIEWS
import Login from "views/Login";
import UserFeed from "views/UserFeed/";
import ProfileWrapper from "views/Profile";
import Photo from "views/Photo";
// COMPONENTS
import Header from "components/Header";
import ComponentDidMount from "common/ComponentDidMount";
// STATE
import { useStateValue } from "providers/StateProvider";

function App() {
  const { state } = useStateValue();
  const { user, users } = state;
  const currentUser = users[user];
  const history = useHistory()
  const scrollToY = history.location.state?.scrollToY;
  const height = history.location.state?.height;
  const style = height ? { minHeight: height } : {};

  return (
    <div className="app" style={style}>
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <div className="body">
          <ComponentDidMount scrollToY={scrollToY} />
            <Switch>
              <Route path="/photo" component={Photo} />
              <Route path="/me">
                <Redirect to={`/${currentUser.url}`} />
              </Route>
              <Route path="/:profileURL" component={ProfileWrapper} />
              <Route path="/" component={UserFeed} />
            </Switch>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
