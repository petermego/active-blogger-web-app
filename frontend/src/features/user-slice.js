import { createSlice } from "@reduxjs/toolkit";

let initValue = null;

if (localStorage.length) {
  initValue = JSON.parse(localStorage.getItem("user-info")).user;
}

const initialState = {
  user: initValue || null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.clear();
      state.user = null;
    },
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;