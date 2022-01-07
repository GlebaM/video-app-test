import { useState, useRef } from "react";
// import LoadingSpinner from "../../components/UI/LoadingSpinner";
import ButtonMain from "../UI/ButtonMain";
// import useHttp from "../hooks/useHttp";
import classes from "./AuthForm.module.css";

// const changedPassword = false;

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [emailValidity, setEmailValidity] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // const { sendRequest, isLoading } = useHttp(changedPassword);

  const switchAuthModeHandler = (event) => {
    event.preventDefault();
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value.trim().toLowerCase();
    const enteredPassword = passwordInputRef.current.value.trim();

    //Add validation
    const emailIsValid = enteredEmail.slice(-4) === ".com";
    const passwordIsValid = enteredPassword.length >= 7;
    if (!emailIsValid) {
      setEmailValidity(false);
      setTimeout(() => {
        setEmailValidity(true);
      }, 4000);
    }

    if (!emailIsValid || !passwordIsValid) {
      return;
    }

    // sendRequest({
    //   isLogin,
    //   email: enteredEmail,
    //   password: enteredPassword,
    // });

    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
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
          <ButtonMain>{isLogin ? "Login" : "Create Account"}</ButtonMain>)
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
