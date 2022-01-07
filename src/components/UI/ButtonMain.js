import classes from "./ButtonMain.module.css";

const ButtonMain = ({ children, onClick, className, type }) => {
  return (
    <button
      type={type}
      className={`${classes.button} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonMain;
