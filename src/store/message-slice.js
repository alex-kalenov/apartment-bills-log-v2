import { createSlice } from "@reduxjs/toolkit";

const msgSlice = createSlice({
  name: "msg",
  initialState: {
    type: "succeed",
    visible: false,
    message: ""
  },
  reducers: {
    show(state, action) {
      state.visible = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    hide(state, action) {
      state.visible = false;
    }
  }
});

export const msgActions = msgSlice.actions;

export default msgSlice;
