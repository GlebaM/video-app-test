import { Fragment, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { getMediaPlayInfo } from "../../lib/api";
import useHttp from "../../hooks/useHttp";
import AuthContext from "../../store/auth-context";

import ResponsivePlayer from "./ResponsivePlayer";
import LoadingSpinner from "./LoadingSpinner";

const Backdrop = ({ onClose }) => {
  return <div className={classes.backdrop} onClick={onClose} />;
};

const ModalOverlay = ({ mediaUrl, status, error, onClose }) => {
  console.log(mediaUrl, status);
  return (
    <div className={classes.modal}>
      {status === "pending" && (
        <div className={classes.center}>
          <LoadingSpinner />
        </div>
      )}
      {status === "completed" && mediaUrl && (
        <>
          <div className={classes.content}>
            <ResponsivePlayer
              mediaUrl={mediaUrl}
              status={status}
              error={error}
            />
          </div>
        </>
      )}

      {status === "completed" && (error || !mediaUrl) && (
        <div className={classes.center}>
          {!mediaUrl && !error && (
            <p>We're sorry but apparently there is no data for that video.</p>
          )}
          {!mediaUrl && error && <p>An error occured.</p>}
          {mediaUrl && error && <p>An error occured.</p>}
        </div>
      )}
      <div className={classes.actions}>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const Modal = ({ mediaId, onClose }) => {
  const ctx = useContext(AuthContext);
  const { sendRequest, status, error, data } = useHttp(getMediaPlayInfo);
  const dataVideo = { ...data };

  useEffect(() => {
    let streamType = ctx.isLoggedIn ? "MAIN" : "TRIAL";
    sendRequest(mediaId, streamType);
  }, [ctx.isLoggedIn, mediaId, sendRequest]);
  console.log(status, error, data);

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
