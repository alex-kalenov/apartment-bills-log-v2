import { authActions } from "./auth-slice";
import { calculateRemainingTime } from "../helpers/functions";

export const logoutHandler = (logoutTimer) => {
  return (dispatch) => {
    dispatch(authActions.removeData());
    clearTimeout(logoutTimer);
  };
};

export const loginHandler = (token, userId, expirationTime) => {
  return (dispatch) => {
    const remainingTime = calculateRemainingTime(expirationTime);
    const logoutTimer = setTimeout(() => {
      dispatch(logoutHandler(logoutTimer));
    }, remainingTime);
    dispatch(
      authActions.setData({ token, userId, expirationTime, logoutTimer })
    );
  };
};
