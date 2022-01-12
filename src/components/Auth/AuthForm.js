import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import ButtonMain from "../UI/ButtonMain";
import classes from "./AuthForm.module.css";
import { getLoginToken } from "../../lib/api";
// import { getAuthToken } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import { useForm } from "react-hook-form";

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [isLogin, setIsLogin] = useState(true);
  // const [emailValidity, setEmailValidity] = useState(true);

  // const emailInputRef = useRef();
  // const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const switchAuthModeHandler = (event) => {
    event.preventDefault();
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (data) => {
    // event.preventDefault();
    //  email: data.username.trim(),
    //   password: data.password.trim()

    const username = data.username.trim();
    const password = data.password.trim();

    //Add validation
    // const emailIsValid = enteredEmail.includes("@");
    // const passwordIsValid = enteredPassword.length >= 7;
    // if (!emailIsValid) {
    //   setEmailValidity(false);
    //   setTimeout(() => {
    //     setEmailValidity(true);
    //   }, 1000);
    // }

    if (!username || !password) {
      return;
    }

    const sentData = { Username: username, Password: password };
    const fetchData = async () => {
      const data = await getLoginToken(sentData);
      authCtx.login(data);
      if (data) {
        history.replace("/home");
      }
    };
    fetchData();

    // const data = { Username: enteredEmail, Password: enteredPassword };
    // getAuthToken(data).then((tokenData) => {
    //   localStorage.setItem("loginToken", tokenData.Token);
    //   localStorage.setItem("loginTokenExpires", tokenData.TokenExpires);
    //   authCtx.login(tokenData.Token);
    //   console.log(tokenData.Token);
    //   console.log(tokenData.TokenExpires);
    // });

    // emailInputRef.current.value = "";
    // passwordInputRef.current.value = "";
  };

  const registerSubmitHandler = (e) => {
    e.preventDefault();
  };

  const formSubmit = (data) => {
    console.log(data);

    const dataValues = {
      email: data.username.trim(),
      password: data.password.trim(),
    };
    console.log(dataValues);
  };

  if (authCtx.isLoggedIn) {
    // const data = {
    //   email: emailInputRef.current.value,
    //   password: passwordInputRef.current.value,
    // };

    console.log(errors);
    return (
      <form onSubmit={handleSubmit(formSubmit)}>
        <input
          type="email"
          {...register("username", { required: "Username is required!" })}
        />
        <input
          type="password"
          {...register("password", {
            required: "Password is required!",
            minLength: { value: 6, message: "Min length is 6" },
          })}
        />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" />
      </form>
    );
  }

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
          />
          {/* {!emailValidity && (
            <p className={classes.invalid}>Type valid email address!</p>
          )} */}
        </div>
        <p>{errors.username?.message}</p>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required!",
              minLength: { value: 6, message: "Min length is 6" },
            })}
          />
        </div>
        <p>{errors.password?.message}</p>
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

  // return (
  //   <section className={classes.auth}>
  //     <h1>{isLogin ? "Login" : "Sign Up"}</h1>
  //     <form onSubmit={isLogin ? submitHandler : registerSubmitHandler}>
  //       <div className={classes.control}>
  //         <label htmlFor="email">Your Email</label>
  //         <input type="email" id="email" ref={emailInputRef} required />
  //         {!emailValidity && (
  //           <p className={classes.invalid}>Type valid email address!</p>
  //         )}
  //       </div>
  //       <div className={classes.control}>
  //         <label htmlFor="password">Your Password</label>
  //         <input
  //           type="password"
  //           id="password"
  //           minLength="7"
  //           ref={passwordInputRef}
  //           required
  //         />
  //       </div>
  //       <div className={classes.actions}>
  //         <ButtonMain type="submit">
  //           {isLogin ? "Login" : "Create Account"}
  //         </ButtonMain>
  //         )
  //         <button
  //           type="button"
  //           className={classes.toggle}
  //           onClick={switchAuthModeHandler}
  //         >
  //           {isLogin ? "Create new account" : "Login with existing account"}
  //         </button>
  //       </div>
  //     </form>
  //   </section>
  // );
};

export default AuthForm;
