import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../constants/routes";
import { signOut } from "../utilities/firebase";
import { useCurrentUserValue } from "../context";

const NavBar = () => {
  const currentUser = useCurrentUserValue();

  //console.log(currentUser);

  return (
    <div className="NavBar">
      <div className="left">
        <h1>
          <Link to={ROUTES.HOME}>Blog</Link>
        </h1>
      </div>
      <div className="left">
        <ul>
          {!currentUser && (
            <>
              <li>
                <Link to={ROUTES.SIGNIN}>Sign In</Link>
              </li>
              <li>
                <Link to={ROUTES.SIGNUP}>Sign Up</Link>
              </li>
            </>
          )}

          {currentUser && (
            <li>
              <span className="sign-out" onClick={signOut}>
                Sign Out
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
