// src/Redux/Reducers/DoctorReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: JSON.parse(localStorage.getItem("isDoctorLogin")) || false,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctor: (state, action) => {
      state.isLogin = true;
      // persist in localStorage

      localStorage.setItem("isDoctorLogin", true);
    },
    removeDoctor: (state) => {
      // state.doctor = null;
      state.isLogin = false;

      localStorage.removeItem("isDoctorLogin");
    },
  },
});

export const { setDoctor, removeDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
