import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import ButtonMain from "../UI/ButtonMain";
import classes from "./AuthForm.module.css";
import { getLoginToken } from "../../lib/api";
// import { getAuthToken } from "../../lib/api";
import AuthContext from "../../store/auth-context";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [emailValidity, setEmailValidity] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const ctx = useContext(AuthContext);
  const history = useHistory();

  const switchAuthModeHandler = (event) => {
    event.preventDefault();
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value.trim();
    const enteredPassword = passwordInputRef.current.value.trim();

    //Add validation
    const emailIsValid = enteredEmail.includes("@");
    const passwordIsValid = enteredPassword.length >= 7;
    if (!emailIsValid) {
      setEmailValidity(false);
      setTimeout(() => {
        setEmailValidity(true);
      }, 1000);
    }

    if (!emailIsValid || !passwordIsValid) {
      return;
    }

    const data = { email: enteredEmail, password: enteredPassword };
    const fetchData = async () => {
      const lg = await getLoginToken(data);
      ctx.login(lg);
    };
    fetchData();

    // const data = { Username: enteredEmail, Password: enteredPassword };
    // getAuthToken(data).then((tokenData) => {
    //   localStorage.setItem("loginToken", tokenData.Token);
    //   localStorage.setItem("loginTokenExpires", tokenData.TokenExpires);
    //   ctx.login(tokenData.Token);
    //   console.log(tokenData.Token);
    //   console.log(tokenData.TokenExpires);
    // });
    history.replace("/home");

    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };

  const registerSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={isLogin ? submitHandler : registerSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInputRef} required />
          {!emailValidity && (
            <p className={classes.invalid}>Type valid email address!</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            minLength="7"
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>
          <ButtonMain type="submit">
            {isLogin ? "Login" : "Create Account"}
          </ButtonMain>
          )
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
