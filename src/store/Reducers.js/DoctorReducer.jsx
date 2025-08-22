import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
  name: "doctor",
  initialState: null,
  reducers: {
    addDoctor: (state, action) => {
      return action.payload;
    },
    removeAllDoctor: () => {
      return null;
    },
  },
});

export const { addDoctor, removeAllDoctor } = doctorSlice.actions;

const doctorReducer = doctorSlice.reducer;
export default doctorReducer;
