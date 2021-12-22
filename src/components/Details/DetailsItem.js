import styles from "./DetailsItem.module.css";

import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "../UI/Card";

import { months } from "../../helpers/data";
import { replaceData } from "../../helpers/functions";
import useHttp from "../../hooks/use-http";

import { showMessage } from "../../store/message-actions";

const DetailsItem = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  const [value, setValue] = useState(props.value);
  const [paid, setPaid] = useState(props.paid);
  const { sendRequest, status, data, error } = useHttp(replaceData, false);

  const convertedDate = new Date(props.date * 1000);
  const digitalMonth = convertedDate.getMonth();
  const date = months[digitalMonth] + " " + convertedDate.getFullYear();

  useEffect(() => {
    if (status === "completed") {
      if (!error) {
        dispatch(showMessage("succeed", "Изменено"));
        props.onReplaceData();
      } else {
        setValue(props.value);
        setPaid(props.paid);
        dispatch(showMessage("error", `Ошибка: ${error}`));
      }
    }
  }, [status, props, error, dispatch]);

  const changeValueHandler = (event) => {
    setValue(event.target.value);
  };

  const changePaidHandler = (event) => {
    setPaid(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredValue = value;
    const enteredPaid = paid;

    const requestData = {
      billId: props.billId,
      date: convertedDate.getTime() / 1000,
      paid: +enteredPaid,
      value: +enteredValue,
      passDetails: {
        token: token,
        userId: userId,
        category: props.category
      }
    };
    if (paid === "" || value === "") {
      dispatch(showMessage("error", "Поля не должны быть пустыми"));
      setValue(props.value);
      setPaid(props.paid);
      return;
    }
    if (paid < 0 || value < 0) {
      dispatch(showMessage("error", "Значения не могут быть отрицательными"));
      setValue(props.value);
      setPaid(props.paid);
      return;
    }
    sendRequest(requestData);
  };

  return (
    <Card className={styles["bills-item"]}>
      <span>{date}</span>
      <form onSubmit={submitHandler}>
        {!props.noValue && (
          <div>
            <label htmlFor="value">Показатели</label>
            <input
              type="number"
              id="value"
              onChange={changeValueHandler}
              value={value}
            />
          </div>
        )}
        <div>
          <label htmlFor="paid">Сумма</label>
          <input
            type="number"
            id="paid"
            onChange={changePaidHandler}
            value={paid}
          />
        </div>
        <div>
          <button type="submit">Изменить</button>
        </div>
      </form>
    </Card>
  );
};

export default React.memo(DetailsItem);
