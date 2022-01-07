// import { useState } from "react";

import ReactPlayer from "react-player/lazy";
import classes from "./VideoList.module.css";

const VideoList = () => {
  return (
    <div className={classes["video__wrapper"]}>
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
        forceDASH
        url="https://cd-streamod.
telenorcdn.net/tnfbaod/SF/585db4b3e4b09db0cf348a64/dash_a1.ism/playlist.mpd"
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
      />
    </div>
  );
};

export default VideoList;
