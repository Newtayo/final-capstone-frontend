import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const userSession = createAsyncThunk('users/fetchUsers', async (data) => {
  const response = await fetch(`http://127.0.0.1:3000/api/v1/${data.endpoint}`, {
    method: 'POST',
    body: JSON.stringify(data.obj),
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
const initialState = {
  user: {},
  reservations: [],
  message: '',
  creationMsg: '',

  logged_in: false,
};

const userReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: () => initialState,
    setUserName: (state, action) => {
      state.user.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSession.fulfilled, (state, action) => {
        const { logged_in, ...userData } = action.payload;
        return {
          ...state,
          user: userData,
          logged_in,
        };
      })
      .addCase(userSession.rejected, (state, action) => ({
        ...state,
        error: action.payload,
      }));
  },
});

export const { logout, setUserName } = userReducer.actions;
export default userReducer.reducer;
