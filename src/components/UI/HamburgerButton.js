import styles from "./HamburgerButton.module.css";

const HamburgerButton = (props) => {
  const buttonClass = `${styles["hamburger-button"]} ${props.className}`;

  return (
    <div className={buttonClass}>
      <input
        type="checkbox"
        onChange={props.onToggle}
        checked={props.isVisible}
      />

      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default HamburgerButton;
