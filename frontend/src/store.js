import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user-slice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});