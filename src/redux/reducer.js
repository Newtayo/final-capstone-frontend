import { combineReducers } from '@reduxjs/toolkit';
import laptopReducer from './laptop/laptopSlice';
import userReducer from './user/sessionSlice';
import reservationReducer from './reservation/reservationSlice';

const rootReducer = combineReducers({
  laptops: laptopReducer,
  users: userReducer,
  reservations: reservationReducer,
});

export default rootReducer;
