import styles from "./Toast.module.css";

import { useContext } from "react";
import { useSelector } from "react-redux";

import MsgContext from "../../store/message-context";

const Toast = (props) => {
  const visible = useSelector((state) => state.msg.visible);
  const type = useSelector((state) => state.msg.type);
  const message = useSelector((state) => state.msg.message);
  //const msgCtx = useContext(MsgContext);

  const toastClass = `${styles.toast} ${
    type === "succeed" ? styles.succeed : styles.error
  } ${visible ? styles.show : ""}`;

  return (
    <div className={toastClass}>
      <p>{message}</p>
    </div>
  );
};

export default Toast;
