import { configureStore } from '@reduxjs/toolkit';
import authSlice from "../slices/authSlices";
import CartSlice from "../slices/CartSlice";
import hostelReducer from '../slices/hostelSlice';
const store = configureStore({
  reducer: {
    auth: authSlice,
    Cart:CartSlice,
      hostel: hostelReducer,
  },
});

export default store;
