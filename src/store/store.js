import { configureStore } from "@reduxjs/toolkit";
import doctorReducer from "./Reducers.js/DoctorReducer";
import adminReducer from "./Reducers.js/AdminReducer";




const store = configureStore({
    reducer:{
        doctor :doctorReducer,
        admin : adminReducer
    }
})

export default store;