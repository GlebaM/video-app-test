import classes from "./ButtonMain.module.css";

const ButtonMain = ({ children, onClick, className }) => {
  return (
    <button
      type="button"
      className={`${classes.button} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonMain;
