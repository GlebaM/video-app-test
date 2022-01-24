import { useEffect, Fragment } from "react";
import classes from "./VideoList.module.scss";
import { getMediaList } from "../../lib/api";
import useHttp from "../../hooks/useHttp";
import LoadingSpinner from "../UI/LoadingSpinner";
import VideoItem from "./VideoItem";

const VideoList = ({ listNo }) => {
  const { sendRequest, status, error, data } = useHttp(getMediaList);
  const dataList = { ...data };
  const mediaList = dataList.entities;

  useEffect(() => {
    sendRequest(listNo);
  }, [listNo, sendRequest]);

  let comments;

  if (status === "pending") {
    comments = (
      <div className={classes.centered}>
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && (!mediaList || mediaList === 0 || error)) {
    comments = (
      <p>
        We are very sorry but the MovieSwag API is anavailable. Please try again
        later.
      </p>
    );
  }

  return (
    <Fragment>
      {comments}
      {status === "completed" && (
        <div className={classes["video__wrapper"]}>
          {mediaList &&
            mediaList.map((item) => {
              const src =
                item.Images.filter((img) => img.ImageTypeCode === "FRAME")[0] ||
                item.Images[0];
              const itemProps = {
                mediaId: src.MediaId,
                src: src.Url,
                title: item.Title,
                year: item.Year || null,
              };
              return <VideoItem key={item.Id} {...itemProps} />;
            })}
        </div>
      )}
    </Fragment>
  );
};

export default VideoList;
