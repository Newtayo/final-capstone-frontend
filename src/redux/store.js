import { configureStore } from '@reduxjs/toolkit';
import laptopReducer from './laptop/laptopSlice';

const store = configureStore({
  reducer: {
    laptops: laptopReducer, 
  },
});

export default store;