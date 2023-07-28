import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const CREATE_RESERVATION_LINK = 'https://laptopreservation.onrender.com/api/v1/reservations/';

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

export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async () => {
  const response = await axios.get(CREATE_RESERVATION_LINK, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { data } = response;
  const reservationList = data.map((reservation) => ({
    id: reservation.id,
    date: reservation.date,
    hour: reservation.hour,
    city: reservation.city,
    laptop_id: reservation.laptop_id,
    user_id: reservation.user_id,
  }));

  return reservationList;
});

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservationsList: [],
    creationMsg: '',
    loading: false, // Add loading state
    error: null, // Add error state
  },
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
      .addCase(addReservation.rejected, (state) => {
        state.creationMsg = 'Failed to add reservation';
      })
      .addCase(fetchReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservationsList = action.payload;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setMsgAction, setRemoveReservationsAction } = reservationsSlice.actions;
export default reservationsSlice.reducer;
