import { configureStore } from '@reduxjs/toolkit';
import authSlice from "../slices/authSlices";
import CartSlice from "../slices/CartSlice"
const store = configureStore({
  reducer: {
    auth: authSlice,
    Cart:CartSlice,
  },
});

export default store;
