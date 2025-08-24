// Example inside adminSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: JSON.parse(localStorage.getItem("isLogin")) || false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state,) => {
      state.isLogin = true;
      localStorage.setItem("isLogin", true);
    },
    removeAdmin: (state,) => {
      state.isLogin = false;
      localStorage.removeItem("isLogin");
    },
  },
});

export const { setAdmin, removeAdmin } = adminSlice.actions;
const adminReducer = adminSlice.reducer;
export default adminReducer;
