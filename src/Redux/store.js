import { configureStore } from "@reduxjs/toolkit";
import doctorReducer from "./Reducers/DoctorReducer";
import adminReducer from "./Reducers/AdminReducer";
import allDocReducer from "./Reducers/allDoctorSlice";

const store = configureStore({
  reducer: {
    doctor: doctorReducer,
    admin: adminReducer,
    allDoctors: allDocReducer,
  },
});

export default store;
