import { Fragment } from "react";

import Navigation from "./Navigation";
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <Fragment>
      <div className={classes.container}>
        <Navigation />
        <main className={classes.main}>{props.children}</main>
      </div>
    </Fragment>
  );
};

export default Layout;
