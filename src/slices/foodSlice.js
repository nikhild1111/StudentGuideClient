import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foods: [],
  loading: false,
  error: null,
  pagination: {
    total: 0,
    currentPage: 1,
    totalPages: 1,
    limit: 6,
  },
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    setFoods: (state, action) => {
      state.foods = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    resetFoodState: () => initialState,
  },
});

export const { setFoods, setLoading, setError, setPagination, resetFoodState } =
  foodSlice.actions;

export default foodSlice.reducer;
