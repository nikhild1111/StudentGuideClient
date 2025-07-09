// src/slices/guideSlice.js
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  guides: [],
  loading: false,
  error: null,
  students: [],
};

const guideSlice = createSlice({
  name: "guide",
  initialState,
  reducers: {
    setGuides: (state, action) => {
      state.guides = action.payload;
    },
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setGuides, setStudents, setLoading, setError } = guideSlice.actions;
export default guideSlice.reducer;
