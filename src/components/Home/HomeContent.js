import VideoList from "./VideoList";
import classes from "./HomeContent.module.scss";

const HomeContent = () => {
  return (
    <div className={classes.container}>
      <div className={classes.container__box}>
        <h2>My list</h2>
        <VideoList listNo={2} />
      </div>
      <div className={classes.container__box}>
        <h2>Favourites</h2>
        <VideoList listNo={4} />
      </div>
    </div>
  );
};

export default HomeContent;
