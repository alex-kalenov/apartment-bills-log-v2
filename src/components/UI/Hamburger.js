import styles from "./Hamburger.module.css";

import { Fragment } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../../store/auth-slice";
import { logoutHandler } from "../../store/auth-actions";

import Button from "./Button";
import HamburgerButton from "./HamburgerButton";
import Layout from "./Layout";

const Hamburger = (props) => {
  const logoutTimer = useSelector((state) => state.auth.logoutTimer);
  const dispatch = useDispatch();
  const visible = props.visible;

  const toggleHamburgerHandler = () => {
    props.setVisible((state) => !state);
  };

  const logoutClickHandler = () => {
    dispatch(logoutHandler(logoutTimer));
  };

  const hamburgerClass = `${styles.menuToggle} ${
    visible ? styles.visible : ""
  }`;

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Layout isVisible={visible} onClick={toggleHamburgerHandler} />,
        document.getElementById("layouts")
      )}
      <HamburgerButton onToggle={toggleHamburgerHandler} isVisible={visible} />
      <div className={hamburgerClass}>
        <nav>{props.children}</nav>
        <div className={styles["logout-wrapper"]}>
          <Button className={styles.logout} onClick={logoutClickHandler}>
            Выйти
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default Hamburger;
