import { useEffect, useState } from "react";
// import { useEffect, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Layout from "./components/layout/Layout";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import SplashPage from "./pages/SplashPage";
import { getPrimaryToken } from "./lib/api";

function App() {
  const [primaryToken, setPrimaryToken] = useState(null);
  useEffect(() => {
    // const aFun = async () => {
    const tokenData = getPrimaryToken();
    localStorage.setItem("primaryToken", tokenData);
    setPrimaryToken(tokenData);
    // };
    // aFun();
  }, [setPrimaryToken]);

  console.log(primaryToken);
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
