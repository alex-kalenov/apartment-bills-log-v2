import styles from "./DetailsContent.module.css";

import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

import DetailsItem from "./DetailsItem";
import DetailsAdd from "./DetailsAdd";

import { getData, sortData } from "../../helpers/functions";

import Item from "../UI/Item";
import LoadingSpinner from "../UI/LoadingSpinner";

import useHttp from "../../hooks/use-http";

const DetailsContent = (props) => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const [rerenderTrigger, setRerenderTrigger] = useState(false);
  const { sendRequest, status, data, error } = useHttp(getData, true);

  let noValue = false;
  if (
    props.category === "rent" ||
    props.category === "rubbish" ||
    props.category === "heating"
  )
    noValue = true;

  useEffect(() => {
    sendRequest({
      token,
      userId,
      category: props.category
    });
  }, [sendRequest, token, userId, props, rerenderTrigger]);

  const rerender = useCallback(() => {
    setRerenderTrigger((state) => {
      return !state;
    });
  }, []);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        Произошла ошибка: <span className="error-highlight">{error}</span>{" "}
        Попробуйте перезагрузить страницу, нажав клавишу <strong>F5</strong> или
        на значок <i className="fa-solid fa-rotate-right"></i> в браузере.
      </div>
    );
  }

  let billsData;
  let sortedData;

  if (data) {
    sortedData = sortData(data, "DESC");
    billsData = sortedData.map((item) => {
      return (
        <Item key={item.id}>
          <DetailsItem
            billId={item.id}
            date={item.date}
            paid={item.paid}
            value={item.value}
            category={props.category}
            onReplaceData={rerender}
            noValue={noValue}
          />
        </Item>
      );
    });
  }

  return (
    <div className="row">
      <Item>
        <DetailsAdd
          onAddData={rerender}
          token={token}
          userId={userId}
          category={props.category}
          noValue={noValue}
          lastDate={sortedData.length !== 0 ? sortedData[0].date : null}
        />
      </Item>
      {billsData}
    </div>
  );
};

export default DetailsContent;
