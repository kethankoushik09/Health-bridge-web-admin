import { createSlice } from "@reduxjs/toolkit";
import doct1 from "../../assets/doct1.png";
import doct2 from "../../assets/doct2.png";

const initialState = {
  list: [
    { id: 1, name: "Dr. G Kethan", specialization: "Cardiologist", image: doct1, available: true },
    { id: 2, name: "Dr. R Sindhu Pallavi", specialization: "Dermatologist", image: doct2, available: true },
    { id: 3, name: "Dr. G Keerthi", specialization: "Gynecologist", image: doct2, available: true },
    { id: 4, name: "Dr. G Vikram", specialization: "Neurologist", image: doct1, available: true },
    { id: 5, name: "Dr. M Sindhu", specialization: "Gastroenterologist", image: doct2, available: false },
    { id: 6, name: "Dr. K Varun", specialization: "Orthopedist", image: doct1, available: true },
    { id: 7, name: "Dr. R Sathvika", specialization: "Pediatrician", image: doct2, available: false },
    { id: 8, name: "Dr. G Tagore", specialization: "General Physician", image: doct1, available: true },
    { id: 9, name: "Dr. A Sharma", specialization: "Cardiologist", image: doct1, available: true },
    { id: 10, name: "Dr. B Reddy", specialization: "Dermatologist", image: doct2, available: false },
    { id: 11, name: "Dr. C Rao", specialization: "Orthopedist", image: doct1, available: true },
    { id: 12, name: "Dr. D Iyer", specialization: "General Physician", image: doct2, available: true },
    { id: 13, name: "Dr. E Naidu", specialization: "Gynecologist", image: doct1, available: false },
    { id: 14, name: "Dr. F Khan", specialization: "Neurologist", image: doct2, available: true },
    { id: 15, name: "Dr. G Thomas", specialization: "Pediatrician", image: doct1, available: true },
    { id: 16, name: "Dr. H Verma", specialization: "Gastroenterologist", image: doct2, available: true },
  ],
};

const allDoctorsSlice = createSlice({
  name: "allDoctors",
  initialState,
  reducers: {},
});

export default allDoctorsSlice.reducer;
