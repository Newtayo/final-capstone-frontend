import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const CREATE_RESERVATION_LINK = 'http://127.0.0.1:3000/api/v1/reservation';

// Async Thunk
export const addReservation = createAsyncThunk('reservations/addReservation', async (data) => {
  const response = await axios.post(CREATE_RESERVATION_LINK, data, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const reservationData = await response.data;
  if (response.status < 200 || response.status >= 300) {
    throw new Error('Failed to add reservation');
  }
  return reservationData;
});

const initialState = {
  reservations: [],
  message: '',
  creationMsg: '',
};

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    setMsgAction: (state, action) => {
      state.creationMsg = action.payload;
    },
    setRemoveReservationsAction: (state, action) => {
      state.reservations = state.reservations.filter((item) => item.laptop_id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addReservation.fulfilled, (state, action) => {
        if (action.payload.newReservation) {
          state.reservations.push(action.payload.newReservation);
          state.creationMsg = action.payload.msg;
        } else {
          state.creationMsg = action.payload.msg;
        }
      })
      .addCase(addReservation.rejected, (state, action) => {
        state.creationMsg = 'Failed to add reservation';
      });
  },
});

export const { setMsgAction, setRemoveReservationsAction } = reservationsSlice.actions;

export default reservationsSlice.reducer;
