import React, { useState, useCallback } from "react";

const AuthContext = React.createContext({
  token: "",
  loginToken: "",
  isLoggedIn: false,
  authorized: false,
  subscribed: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState();
  const [loginToken, setLoginToken] = useState();

  let initialToken = localStorage.getItem("token");
  initialToken = initialToken ? initialToken.token : "";
  if (initialToken) {
    setToken(initialToken);
  }

  let initialLoginToken = localStorage.getItem("loginToken");
  initialLoginToken = initialLoginToken ? initialLoginToken.loginToken : "";
  if (initialLoginToken) {
    setToken(initialLoginToken);
  }

  const userIsLoggedIn = !!loginToken;

  const logoutHandler = useCallback(() => {
    setLoginToken(null);
    localStorage.removeItem("loginToken");
  }, []);

  const loginHandler = (token) => {
    console.log(token);
    if (!token) return;
    if (token) {
      setLoginToken(token);
      localStorage.setItem("authorized", true);
      localStorage.setItem("loginToken", token);
    }
  };

  const contextValue = {
    token: token,
    loginToken: loginToken,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
