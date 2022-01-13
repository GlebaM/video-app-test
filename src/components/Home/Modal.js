import { Fragment, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { getMediaPlayInfo } from "../../lib/api";
import useHttp from "../../hooks/useHttp";
import AuthContext from "../../store/auth-context";

import ResponsivePlayer from "./ResponsivePlayer";
import LoadingSpinner from "../UI/LoadingSpinner";

const Backdrop = ({ onClose }) => {
  return <div className={classes.backdrop} onClick={onClose} />;
};

const ModalOverlay = ({ mediaUrl, status, error, onClose }) => {
  const authCtx = useContext(AuthContext);

  let content = <div className={classes.content}></div>;
  if (status === "pending") {
    content = (
      <div className={classes.center}>
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && !error && mediaUrl && !authCtx.isLoggedIn) {
    content = (
      <div className={classes.content}>
        <ResponsivePlayer mediaUrl={mediaUrl} status={status} error={error} />
      </div>
    );
  }

  if (status === "completed" && !authCtx.subscribed && authCtx.isLoggedIn) {
    content = (
      <div className={classes.center}>
        <p>You need to be subscribed.</p>
      </div>
    );
  }
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

  if (status === "completed" && authCtx.subscribed) {
    content = (
      <div className={classes.content}>
        <ResponsivePlayer mediaUrl={mediaUrl} status={status} error={error} />
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

const Modal = ({ mediaId, onClose }) => {
  const authCtx = useContext(AuthContext);
  const { sendRequest, status, error, data } = useHttp(getMediaPlayInfo);
  const dataVideo = { ...data };
  let streamType = authCtx.authorized ? "MAIN" : "TRIAL";

  useEffect(() => {
    sendRequest({ mediaId, streamType });
  }, [authCtx.isLoggedIn, mediaId, sendRequest, streamType]);

  const backdrop = document.querySelector("#backdrop-root");
  const modal = document.querySelector("#overlay-root");

  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, backdrop)}
      {ReactDOM.createPortal(
        <ModalOverlay
          status={status}
          error={error}
          onClose={onClose}
          mediaUrl={dataVideo.ContentUrl}
        />,
        modal
      )}
    </Fragment>
  );
};

export default Modal;
