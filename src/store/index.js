import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth-slice";
import msgSlice from "./message-slice";

const store = configureStore({
  reducer: { auth: authSlice.reducer, msg: msgSlice.reducer }
});

export default store;
