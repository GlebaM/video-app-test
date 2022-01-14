import { Fragment, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { getMediaPlayInfo } from "../../../lib/api";
import useHttp from "../../../hooks/useHttp";
import AuthContext from "../../../store/auth-context";
import ModalOverlay from "./ModalOverlay";

const Backdrop = ({ onClose }) => {
  return <div className={classes.backdrop} onClick={onClose} />;
};

const Modal = ({ mediaId, onClose }) => {
  const authCtx = useContext(AuthContext);
  const { sendRequest, status, error, data } = useHttp(getMediaPlayInfo);
  const dataVideo = { ...data };
  let streamType = authCtx.isLoggedIn ? "MAIN" : "TRIAL";

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
