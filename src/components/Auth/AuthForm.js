import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import ButtonMain from "../UI/ButtonMain";
import classes from "./AuthForm.module.css";
import { getAuthToken } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import { useForm } from "react-hook-form";

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [isLogin, setIsLogin] = useState(true);
  const [userExists, setUserExists] = useState(true);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const switchAuthModeHandler = (event) => {
    event.preventDefault();
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (data) => {
    const username = data.username.trim();
    const password = data.password.trim();

    if (!username || !password) return;

    const sentData = { Username: username, Password: password };
    getAuthToken(sentData).then((tokenData) => {
      localStorage.setItem("loginToken", tokenData.Token);
      localStorage.setItem("loginTokenExpires", tokenData.TokenExpires);
      authCtx.login(tokenData.Token);
      if (tokenData.Token) {
        history.replace("/home");
      } else {
        setUserExists(false);
        throw new Error(`Data hasn't arrivedd`);
      }
    });
  };

  const registerSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

      <form
        onSubmit={handleSubmit(isLogin ? submitHandler : registerSubmitHandler)}
      >
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            {...register("username", { required: "Username is required!" })}
            placeholder="Username / email"
          />
        </div>
        <p className={classes.message}>{errors.username?.message}</p>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required!",
              minLength: { value: 6, message: "Min password length is 6" },
            })}
            placeholder="Password"
          />
        </div>
        <p className={classes.message}>{errors.password?.message}</p>
        {!userExists && (
          <p className={classes["user-fetch-error"]}>
            Username / email or password is incorrect. Please try again!
          </p>
        )}
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
