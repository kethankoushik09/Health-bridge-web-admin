import { createSlice } from "@reduxjs/toolkit";

const allDoctorsSlice = createSlice({
  name: "allDoctors",
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
export const { addDoctor, removeAllDoctor } = allDoctorsSlice.actions;

export default allDoctorsSlice.reducer;
