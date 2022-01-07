import { Link } from "react-router-dom";
import ButtonMain from "../UI/ButtonMain";
import classes from "./MainSplash.module.css";

function MainSplash() {
  return (
    <div className={classes.splash}>
      <h1>MovieSwag is where conversions happen</h1>
      <p>
        Customers like you get up to 40% off the actual price for VIDEO APP
        subscription. There is ove 50 000 movies waiting for you.
      </p>
      <p>Login and enjoy with full potential</p>
      <ButtonMain className={classes.splash__button}>
        <Link to="/auth" className={classes.logo}>
          Login
        </Link>
      </ButtonMain>
      <p> or see a sample of home page and then</p>
      <ButtonMain className={classes.splash__button}>
        <Link to="/home" className={classes.logo}>
          Get started
        </Link>
      </ButtonMain>
    </div>
  );
}

export default MainSplash;
