import { useEffect, useContext } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import AuthContext from "./store/auth-context";
import { getPrimaryToken } from "./lib/api";

import Layout from "./components/layout/Layout";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import SplashPage from "./pages/SplashPage";

function App() {
  const ctx = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const tokenData = await getPrimaryToken();
      localStorage.setItem("token", tokenData);
    };
    fetchData();
    const loginToken = localStorage.getItem("loginToken");
    ctx.login(loginToken);
  }, [ctx]);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <SplashPage />
        </Route>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

// useEffect(() => {
//   const fetchData = async () => {
//     const tokenData = await getPrimaryToken();
//     localStorage.setItem("token", tokenData);
//     setPrimaryToken(tokenData);
//   };
//   fetchData();
// }, []);

// useEffect(() => {
//   const fetchData = async () => {
//     const { entities } = await getMediaList(3);
//     setList(entities);
//   };
//   fetchData();
// }, []);

// useEffect(() => {
//   const fetchData = async () => {
//     const item = await getMediaPlayInfo();
//     setPlayer(item);
//   };
//   fetchData();
// }, []);
// useEffect(() => {
//   const data = { email: "test@bsgroup.eu", password: "Test12!@" };
//   const fetchData = async () => {
//     const lg = await getLoginToken(data);
//     setLogged(lg);
//   };
//   fetchData();
// }, []);
