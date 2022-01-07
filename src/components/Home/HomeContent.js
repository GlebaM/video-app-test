import VideoList from "./VideoList";
import classes from "./HomeContent.module.css";

const HomeContent = () => {
  return (
    <div className={classes.container}>
      <div className={classes.container__box}>
        {/* <img
          src="https://d1n3vpqjhjvv6k.cloudfront.net:443/Asset/6e6a86e5356f47958998305e1b202536/Images/cfe375de54ee41558bd6ea93c344eb20"
          alt="any"
        /> */}
        <h2>My list</h2>
        <VideoList />
      </div>
      <div className={classes.container__box}>
        <h2>Favourites</h2>
        <VideoList />
      </div>
    </div>
  );
};

export default HomeContent;
