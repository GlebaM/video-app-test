import React, { useContext, Fragment } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import ButtonMain from "../UI/ButtonMain";
import classes from "./Navigation.module.scss";

const Navigation = () => {
  const authCtx = useContext(AuthContext);

  const history = useHistory();
  const location = useLocation();

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/");
  };

  const content = (
    <Fragment>
      <ul>
        {!isLoggedIn && location.pathname !== "/auth" && (
          <li>
            <Link to="/auth">Login</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <ButtonMain onClick={logoutHandler}>Logout</ButtonMain>
          </li>
        )}
      </ul>
    </Fragment>
  );
  return (
    <header className={classes.header}>
      <div className={classes.header__container}>
        <Link to="/" className={classes.header__logo}>
          MovieSwag
        </Link>
        <nav>{content}</nav>
      </div>
    </header>
  );
};

export default Navigation;
