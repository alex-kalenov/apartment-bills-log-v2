import styles from "./Layout.module.css";

const Layout = (props) => {
  const layoutClass = `${styles.layout} ${
    props.isVisible ? styles.visible : ""
  }`;

  return <div className={layoutClass} onClick={props.onClick}></div>;
};

export default Layout;
