import { Fragment, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import ButtonMain from "../UI/ButtonMain";
import classes from "./MainSplash.module.scss";

function MainSplash() {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const pathHandler = (href) => {
    history.replace(href);
  };
  return (
    <div className={classes.splash}>
      <h1>MovieSwag is where movies happen</h1>
      <p>
        Customers like you get up to 40% off the actual price for{" "}
        <b>MovieSwag</b> subscription. There is ove 50 000 movies waiting for
        you.
      </p>
      {!authCtx.isLoggedIn && (
        <Fragment>
          <p>Login and enjoy MovieSwag full potential</p>
          <ButtonMain
            onClick={() => {
              pathHandler("/auth");
            }}
            className={classes.splash__button}
          >
            Login
          </ButtonMain>
        </Fragment>
      )}
      {!authCtx.isLoggedIn ? (
        <p> or see a sample on Home page by pressing Get started.</p>
      ) : (
        <p> See a sample on Home page by clicking Get started.</p>
      )}
      <ButtonMain
        onClick={() => {
          pathHandler("/home");
        }}
        className={classes.splash__button}
      >
        Get started
      </ButtonMain>
    </div>
  );
}

export default MainSplash;
