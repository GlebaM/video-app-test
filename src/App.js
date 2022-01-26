import { useEffect, useContext, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import AuthContext from "./store/auth-context";
import { getAuthToken } from "./lib/api";

import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import SplashPage from "./pages/SplashPage";

function App() {
  const [loading, setLoading] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);

    const token = localStorage.getItem("token");
    const timeToExpire =
      new Date(localStorage.getItem("tokenExpires"))?.getTime() -
      new Date().getTime();

    if (token && timeToExpire > 60000) {
      setLoading(false);
    }
    if ((token && timeToExpire <= 60000) || !token) {
      try {
        getAuthToken().then((tokenData) => {
          localStorage.setItem("token", tokenData.Token);
          localStorage.setItem("tokenExpires", tokenData.TokenExpires);
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  }, [authCtx]);

  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    const timeToExpire =
      new Date(localStorage.getItem("loginTokenExpires"))?.getTime() -
      new Date().getTime();
    if (loginToken && timeToExpire > 60000) {
      authCtx.login(loginToken);
    }
    if (loginToken && timeToExpire <= 60000) {
      authCtx.logout();
    }
  }, [authCtx]);

  if (loading) return null;

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <SplashPage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="*">
          {<Redirect to="/" /> || (
            <div>
              <h1>Something went wrong</h1>
            </div>
          )}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
