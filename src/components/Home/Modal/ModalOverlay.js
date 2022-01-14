import { useContext, useState, useEffect } from "react";
import AuthContext from "../../../store/auth-context";
import ResponsivePlayer from "./../ResponsivePlayer";
import LoadingSpinner from "../../UI/LoadingSpinner";

import classes from "./ModalOverlay.module.css";

const ModalOverlay = ({ mediaUrl, status, error, onClose }) => {
  const authCtx = useContext(AuthContext);

  //Loading spinner
  let content = <div className={classes.content}></div>;
  if (status === "pending") {
    content = (
      <div className={classes.center}>
        <LoadingSpinner />
      </div>
    );
  }

  //Not Logged in, no error, url exists
  if (status === "completed" && !error && mediaUrl && !authCtx.isLoggedIn) {
    content = (
      <div className={classes.content}>
        <ResponsivePlayer mediaUrl={mediaUrl} />
      </div>
    );
  }

  // No url or the movie/movie trailer
  if (status === "completed" && !mediaUrl && !error) {
    content = (
      <div className={classes.center}>
        <p>We're sorry but apparently there is no data for that video.</p>
      </div>
    );
  }
  if (status === "completed" && error) {
    content = (
      <div className={classes.center}>
        <p>{error}</p>
      </div>
    );
  }

  //Logged in but not subscribed
  if (status === "completed" && !authCtx.subscribed && authCtx.isLoggedIn) {
    content = (
      <div className={classes.center}>
        <p>You need to be subscribed to watch that video.</p>
      </div>
    );
  }

  if (status === "completed" && authCtx.subscribed) {
    content = (
      <div className={classes.content}>
        <ResponsivePlayer mediaUrl={mediaUrl} />
      </div>
    );
  }

  return (
    <div className={classes.modal}>
      {content}
      <div className={classes.actions}>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ModalOverlay;
