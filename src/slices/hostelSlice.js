// src/slices/hostelSlice.js
import { createSlice } from "@reduxjs/toolkit";

const hostelSlice = createSlice({
  name: "hostel",
  initialState: {
    loading: false,
    hostels: [],
    pagination: null,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => { state.loading = action.payload },
    setHostels: (state, action) => { state.hostels = action.payload },
    setPagination: (state, action) => { state.pagination = action.payload },
    setError: (state, action) => { state.error = action.payload },
    clearHostels: (state) => {
      state.hostels = [];
      state.pagination = null;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setHostels,
  setPagination,
  setError,
  clearHostels,
} = hostelSlice.actions;

export default hostelSlice.reducer;
