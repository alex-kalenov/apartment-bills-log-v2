import { createSlice } from "@reduxjs/toolkit";
import { retrieveStoredToken } from "../helpers/functions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: retrieveStoredToken().token,
    userId: retrieveStoredToken().userId,
    expirationTime: retrieveStoredToken().duration,
    logoutTimer: null
  },
  reducers: {
    removeData(state, action) {
      state.token = null;
      state.userId = null;
      state.expirationTime = null;
      state.logoutTimer = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("expirationTime");
    },
    setData(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.expirationTime = action.payload.expirationTime;
      state.logoutTimer = action.payload.logoutTimer;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("expirationTime", action.payload.expirationTime);
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice;
