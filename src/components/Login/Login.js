import styles from "./Login.module.css";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { loginHandler } from "../../store/auth-actions";
import { showMessage } from "../../store/message-actions";

import useHttp from "../../hooks/use-http";
import { loginRequest } from "../../helpers/functions";

import Card from "../UI/Card";
import Button from "../UI/Button";
import LoadingSpinner from "../UI/LoadingSpinner";

const Login = () => {
  const dispatch = useDispatch();
  const { sendRequest, status, data, error } = useHttp(loginRequest, false);

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (status === "completed") {
      if (!error) {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        dispatch(
          loginHandler(data.idToken, data.localId, expirationTime.toISOString())
        );
      } else {
        dispatch(showMessage("error", `Ошибка: ${error}`));
      }
    }
  }, [status, data, error, dispatch]);

  const loginClickHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    sendRequest({ email: enteredEmail, password: enteredPassword });
  };

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Card className={styles["form-wrapper"]}>
      <form onSubmit={loginClickHandler}>
        <div className={styles["form-row"]}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" ref={emailRef} />
        </div>
        <div className={styles["form-row"]}>
          <label htmlFor="password">Пароль</label>
          <input id="password" type="password" ref={passwordRef} />
        </div>
        <div className={styles["form-row"]}>
          <Button type="submit">Войти</Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
