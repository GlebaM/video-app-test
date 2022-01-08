import { useState, useEffect } from "react";
import classes from "./VideoList.module.css";
import { getMediaList } from "../../lib/api";

const VideoList = ({ listNo }) => {
  const [mediaList, setMediaList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { entities } = await getMediaList(listNo);
      setMediaList(entities);
    };
    fetchData();
  }, [listNo]);

  return (
    <div className={classes["video__wrapper"]}>
      {mediaList &&
        mediaList.map((item) => {
          const src =
            item.Images.filter((img) => img.ImageTypeCode === "FRAME")[0] ||
            item.Images[0];
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
    </div>
  );
};

export default VideoList;
