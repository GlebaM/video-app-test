import React, { useState, Fragment } from "react";
import classes from "./VideoItem.module.scss";
import Modal from "./Modal/Modal";

const VideoItem = ({ mediaId, src, title, year }) => {
  const [modalActive, setModalActive] = useState(false);

  const videoModalHandler = () => {
    setModalActive(true);
  };

  const modalCloseHandler = () => {
    setModalActive(false);
  };

  return (
    <Fragment>
      {modalActive && <Modal onClose={modalCloseHandler} mediaId={mediaId} />}
      <div
        onClick={videoModalHandler}
        key={mediaId}
        className={classes.video__item}
      >
        <img
          id={mediaId}
          src={src}
          alt={title}
          className={classes.video__img}
        />
        <p>
          {title} {year && `(${year})`}
        </p>
      </div>
    </Fragment>
  );
};

export default VideoItem;
