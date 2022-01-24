import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import ButtonMain from "../UI/ButtonMain";
import classes from "./MainSplash.module.scss";

function MainSplash() {
  const ctx = useContext(AuthContext);
  return (
    <div className={classes.splash}>
      <h1>MovieSwag is where movies happen</h1>
      <p>
        Customers like you get up to 40% off the actual price for{" "}
        <b>MovieSwag</b> subscription. There is ove 50 000 movies waiting for
        you.
      </p>
      {!ctx.isLoggedIn && (
        <Fragment>
          <p>Login and enjoy MovieSwag full potential</p>
          <ButtonMain className={classes.splash__button}>
            <Link to="/auth" className={classes.splash__logo}>
              Login
            </Link>
          </ButtonMain>
        </Fragment>
      )}
      {!ctx.isLoggedIn ? (
        <p> or see a sample on Home page by pressing Get started.</p>
      ) : (
        <p> See a sample on Home page by clicking Get started.</p>
      )}
      <ButtonMain className={classes.splash__button}>
        <Link to="/home" className={classes.splash__logo}>
          Get started
        </Link>
      </ButtonMain>
    </div>
  );
}

export default MainSplash;
