import { createSlice } from "@reduxjs/toolkit";

let initValue = null;
let token = null;

if (localStorage.length) {
  initValue = JSON.parse(localStorage.getItem("user-info")).user;
  token = JSON.parse(localStorage.getItem("user-info")).token;
}

const initialState = {
  user: initValue,
  token: token
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setImg: (state, action) => {
      localStorage.setItem("user-info", JSON.stringify(action.payload));
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.token = null;
    },
  }
});

export const { login, logout, setImg } = userSlice.actions;
export default userSlice.reducer;