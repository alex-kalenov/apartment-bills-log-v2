import styles from "./Button.module.css";

const Button = (props) => {
  const buttonClass = `${styles.button} ${props.className}`;
  return (
    <button className={buttonClass} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
