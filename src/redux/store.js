import { configureStore } from '@reduxjs/toolkit';
import laptopReducer from './laptop/laptopSlice';
import userReducer from './user/sessionSlice';

const store = configureStore({
  reducer: {
    laptops: laptopReducer,
    users: userReducer,
  },
});

export default store;
