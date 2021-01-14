import React from "react";
import { Switch, Route } from "react-router-dom";

import "./sass/styles.scss";

import * as ROUTES from "./constants/routes";
import DisplayAllPosts from "./components/DisplayAllPosts";
import PostPage from "./components/PostPage";
import NavBar from "./components/NavBar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import CreateNewPost from "./components/CreateNewPost";

const App = () => {
  return (
    <div className="Application">
      <header>
        <NavBar />
      </header>
      <main>
        <Switch>
          <Route exact path={ROUTES.HOME} component={DisplayAllPosts} />
          <Route path={ROUTES.POSTPAGE} component={PostPage} />
          <Route path={ROUTES.SIGNIN} component={SignIn} />
          <Route path={ROUTES.SIGNUP} component={SignUp} />
          <Route path={ROUTES.ADDPOST} component={CreateNewPost} />
        </Switch>
      </main>
    </div>
  );
};
export default App;
