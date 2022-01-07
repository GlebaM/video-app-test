// import React, { useContext, Fragment } from "react";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// import AuthContext from "../../store/auth-context";

import classes from "./Navigation.module.css";

const Navigation = () => {
  // const authCtx = useContext(AuthContext);

  // const history = useHistory();

  // const isLoggedIn = authCtx.isLoggedIn;

  // const logoutHandler = () => {
  //   // authCtx.logout();
  //   history.replace("/");
  // };

  const content = (
    <Fragment>
      <ul>
        <li>
          <Link to="/auth">Login</Link>
        </li>
        {/* {!isLoggedIn && (
          <li>
            <Link to="/auth">Login</Link>
          </li>
        )}
        {isLoggedIn && (
          
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          
        )} */}
      </ul>
    </Fragment>
  );
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to="/" className={classes.logo}>
          Video APP
        </Link>
        <nav>{content}</nav>
      </div>
    </header>
  );
};

export default Navigation;
