import classes from "./AnchorLink.module.scss";

const AnchorLink = ({ children, onClick, className, type = "button" }) => {
  return (
    <a
      href="/#"
      type={type}
      className={`${classes.link} ${className}`}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default AnchorLink;
