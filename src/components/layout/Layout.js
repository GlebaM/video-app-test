import { Fragment } from "react";

import Navigation from "./Navigation";
import classes from "./Layout.module.scss";

const Layout = (props) => {
  return (
    <Fragment>
      <div className={classes.container}>
        <Navigation />
        <main className={classes.container__main}>{props.children}</main>
      </div>
    </Fragment>
  );
};

export default Layout;
