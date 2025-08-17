import { configureStore } from '@reduxjs/toolkit';
import authSlice from "../slices/authSlices";
import CartSlice from "../slices/CartSlice";
import hostelReducer from '../slices/hostelSlice';
import guideReducer from "../slices/guideSlice";
import mentorReducer from "../slices/mentorSlice";  // ✅ Import Mentor Slice
import foodReducer from "../slices/foodSlice";
import bookReducer  from "../slices/booksSlice"
const store = configureStore({
  reducer: {
    auth: authSlice,
    Cart: CartSlice,
    hostel: hostelReducer,
    guide: guideReducer,
    mentor: mentorReducer, 
      // ✅ Add mentor reducer
        food: foodReducer,
        book:bookReducer,
  },
});

export default store;
