import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Actions
// const FULLFILED = 'quickmaths-frontend/user/user-signup/FULLFILED';
// const LOGOUT = 'quickmaths-frontend/user/user-signup/LOGOUT';
// const ADD_RESERVATION = 'reservations/reseravtions/ADD_RESERVATION';
// const REMOVE_MSG = 'reservations/reservations/REMOVE_MSG';
const CREATE_RESERVATION_LINK = 'http://127.0.0.1:3000/api/v1/reservation';
// const REMOVE_RESERVATIONS = 'reservations/reservations/REMOVE_RESERVATIONS';

export const userSession = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch(`http://127.0.0.1:3000/api/v1/${endpoint}`,{
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const userData = await response.json();
  if (response.status < 200 || response.status >= 300) {
    return 'fails';
  }
  return userData;
});
// Initial state
const initialState = {
  user: {},
  reservations: [],
  message: '',
  creationMsg: '',
};

// Reducer
const userReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userSession.fulfilled, (state, action) => ({
        ...state,
        cars: action.payload,
      }));
    builder.addCase(
      userSession.rejected,
      (state, action) => ({
        ...state,
        error: action.payload,
      }),
    );
    builder.addCase(userSession.fulfilled, (state, action) => ({
      ...state,
      messages: action.payload,
    }));
  },
});


const fetchReservation = (data) => async (dispatch) => {
  await fetch(CREATE_RESERVATION_LINK, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((result) => result.json())
    .then((res) => {
      const result = {
        msg: res.message,
        newReservation: res.reservation_obj,
      };
      dispatch(setReservationAction(result));
    });
};

export default userReducer;
