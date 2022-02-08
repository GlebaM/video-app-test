import React, { useContext, Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import ButtonMain from "../UI/ButtonMain";
import AnchorLink from "../UI/AnchorLink";
import classes from "./Navigation.module.scss";

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const history = useHistory();
  const location = useLocation();

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/");
  };

  // const logoutHandler = () => {
  //   authCtx.logout();
  //   history.replace("/");
  // };

  const clickHandler = (href) => {
    history.replace(`${href}`);
  };

  const content = (
    <Fragment>
      <ul>
        {!isLoggedIn && location.pathname !== "/auth" && (
          <li>
            <AnchorLink
              className={classes.header__link}
              onClick={(e) => {
                e.preventDefault();
                clickHandler("/auth");
              }}
            >
              Login
            </AnchorLink>
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
        <AnchorLink
          className={classes.header__logo}
          onClick={(e) => {
            e.preventDefault();
            clickHandler("/");
          }}
        >
          MovieSwag
        </AnchorLink>
        <nav>{content}</nav>
      </div>
    </header>
  );
};

export default Navigation;
