import { msgActions } from "./message-slice";

export const showMessage = (type, message) => {
  return (dispatch) => {
    dispatch(msgActions.show({ type, message }));
    setTimeout(() => {
      dispatch(msgActions.hide());
    }, 2000);
  };
};
