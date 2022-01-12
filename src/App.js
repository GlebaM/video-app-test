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
  const ctxAuth = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);

    getAuthToken()
      .then((tokenData) => {
        localStorage.setItem("token", tokenData.Token);
        localStorage.setItem("tokenExpires", tokenData.TokenExpires);
        if (!ctxAuth.isLoggedIn) {
          localStorage.setItem("authorized", false);
        }
      })
      .finally(setLoading(false));
  }, [ctxAuth]);

  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      ctxAuth.login(loginToken);
    }
  }, [ctxAuth]);

  if (loading) return null;

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <SplashPage />
        </Route>
        {!ctxAuth.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
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
