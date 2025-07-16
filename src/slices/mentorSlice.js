import { createSlice } from "@reduxjs/toolkit";

const mentorSlice = createSlice({
  name: "mentor",
  initialState: {
    loading: false,
    mentors: [],
    pagination: null,
    error: null,
  },
  reducers: {
    setMentorLoading: (state, action) => { state.loading = action.payload },
    setMentors: (state, action) => { state.mentors = action.payload },
    setMentorPagination: (state, action) => { state.pagination = action.payload },
    setMentorError: (state, action) => { state.error = action.payload },
    clearMentors: (state) => {
      state.mentors = [];
      state.pagination = null;
      state.error = null;
    },
  },
});

export const {
  setMentorLoading,
  setMentors,
  setMentorPagination,
  setMentorError,
  clearMentors,
} = mentorSlice.actions;

export default mentorSlice.reducer;
