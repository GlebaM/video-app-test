import React, { useState, useCallback } from "react";

const AuthContext = React.createContext({
  token: "",
  loginToken: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  let initialToken = localStorage.getItem("token");
  initialToken = initialToken ? initialToken.token : "";
  const [token, setToken] = useState(initialToken);
  if (initialToken) {
    setToken(initialToken);
  }

  let initialLoginToken = localStorage.getItem("loginToken");
  initialLoginToken = initialLoginToken ? initialLoginToken.loginToken : "";
  const [loginToken, setLoginToken] = useState(initialLoginToken);
  if (initialLoginToken) {
    setToken(initialLoginToken);
  }

  const userIsLoggedIn = !!loginToken;

  const logoutHandler = useCallback(() => {
    setLoginToken(null);
    localStorage.removeItem("loginToken");
  }, []);

  const loginHandler = (token) => {
    if (!token) return;
    if (token) {
      setLoginToken(token);
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
