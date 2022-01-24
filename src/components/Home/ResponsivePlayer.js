import classes from "./ResponsivePlayer.module.scss";
import ReactPlayer from "react-player";

const ResponsivePlayer = ({ mediaUrl }) => {
  return (
    <div className={classes["player-wrapper"]}>
      <ReactPlayer
        className={classes["react-player"]}
        url={mediaUrl}
        width="100%"
        height="100%"
        controls
        volume={0.3}
      />
    </div>
  );
};

export default ResponsivePlayer;
