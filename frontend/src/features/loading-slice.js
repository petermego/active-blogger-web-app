import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    switchLoadingState: (state, action) => {
      state.isLoading = action.payload
    },
  },
});

export const { switchLoadingState } = loadingSlice.actions;
export default loadingSlice.reducer;