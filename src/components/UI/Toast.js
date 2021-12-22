import styles from "./Toast.module.css";

import { useSelector } from "react-redux";

const Toast = (props) => {
  const visible = useSelector((state) => state.msg.visible);
  const type = useSelector((state) => state.msg.type);
  const message = useSelector((state) => state.msg.message);

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
