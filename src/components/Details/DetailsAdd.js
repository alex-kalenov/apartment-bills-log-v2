import styles from "./DetailsAdd.module.css";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import useHttp from "../../hooks/use-http";
import { sendData } from "../../helpers/functions";

import { showMessage } from "../../store/message-actions";

const DetailsAdd = (props) => {
  const dispatch = useDispatch();
  const { token, userId, category } = props;
  const { sendRequest, status, data, error } = useHttp(sendData, false);

  useEffect(() => {
    if (status === "completed") {
      if (!error) {
        dispatch(showMessage("succeed", `Добавлено`));
        props.onAddData();
      } else {
        dispatch(showMessage("error", `Ошибка: ${error}`));
      }
    }
  }, [status, props, error, dispatch]);

  const add = () => {
    const lastDate = new Date(props.lastDate * 1000);
    const isCurrentMonth =
      lastDate.getMonth() === new Date().getMonth() &&
      lastDate.getFullYear() === new Date().getFullYear();

    if (lastDate && isCurrentMonth) {
      dispatch(showMessage("error", "Данные за этот месяц уже добавлены"));
      return;
    }
    sendRequest({ token, userId, category });
  };

  const buttonClass = `${styles["add-button"]} ${
    props.noValue ? styles["no-value"] : ""
  }`;

  return (
    <button className={buttonClass} onClick={add}>
      <div className={styles["add-button__inner"]}></div>
    </button>
  );
};

export default React.memo(DetailsAdd);
