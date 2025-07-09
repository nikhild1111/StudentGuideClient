import { configureStore } from '@reduxjs/toolkit';
import authSlice from "../slices/authSlices";
import CartSlice from "../slices/CartSlice";
import hostelReducer from '../slices/hostelSlice';
import guideReducer from "../slices/guideSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    Cart:CartSlice,
      hostel: hostelReducer,
       guide: guideReducer,
  },
});

export default store;
