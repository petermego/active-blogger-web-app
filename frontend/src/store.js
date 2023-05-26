import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user-slice";
import loadingSlice from "./features/loading-slice";

export default configureStore({
  reducer: {
    user: userReducer,
    loading: loadingSlice,
  },
});