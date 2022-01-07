import { useState, useEffect } from "react";
// import ReactPlayer from "react-player/lazy";
import classes from "./VideoList.module.css";
import { getMediaList } from "../../lib/api";

const VideoList = ({ listNo }) => {
  const [mediaList, setMediaList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { entities } = await getMediaList(listNo);
      setMediaList(entities);
      console.log(entities);
    };
    fetchData();
  }, [listNo]);

  console.log(mediaList);

  return (
    <div className={classes["video__wrapper"]}>
      {mediaList &&
        mediaList.map((item) => {
          const src =
            item.Images.filter((img) => img.ImageTypeCode === "FRAME")[0] ||
            item.Images[0];
          console.log(src);
          return (
            <div className={classes.video__item}>
              <img
                id={src.MediaId}
                src={src.Url}
                alt=""
                className={classes.video__img}
              />
            </div>
          );
        })}
      {/* {mediaList &&
        mediaList.map((item) => {
          let src = item.Id;
          console.log(src);
          return <div>{src}</div>;
        })} */}

      {/* <ReactPlayer
        className={classes.video__item}
        volume={0.3}
        controls
        url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
      />
      <ReactPlayer
        className={classes.video__item}
        volume={0.3}
        controls
        url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
      />
      <ReactPlayer
        className={classes.video__item}
        volume={0.3}
        controls
        url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
      />
      <ReactPlayer
        className={classes.video__item}
        volume={0.3}
        controls
        url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
      /> */}
    </div>
  );
};

export default VideoList;
