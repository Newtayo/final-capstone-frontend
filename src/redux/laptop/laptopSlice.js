import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setRemoveReservationsAction } from '../reservation/reservationSlice';

const LINK = 'https://laptopreservation.onrender.com/api/v1/laptops';

const initialState = {
  laptops: [],
  message: '',
};

export const fetchLaptops = createAsyncThunk('laptops/fetchLaptops', async () => {
  const response = await axios.get(LINK, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { data } = response; // Destructure 'data' from the response
  const laptopsList = data.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    photoUrl: item.photo_url,
    modelYear: item.model_year,
    price: item.price,
    romSize: item.rom_size,
    ramSize: item.ram_size,
  }));
  return laptopsList;
});

export const addLaptop = createAsyncThunk('laptops/addLaptop', async (obj) => {
  const response = await axios.post(LINK, obj, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const { data } = response; // Destructure 'data' from the response
  if (data.laptop_obj) {
    const laptopObj = {
      id: data.laptop_obj.id,
      name: data.laptop_obj.name,
      description: data.laptop_obj.description,
      photoUrl: data.laptop_obj.photo_url,
      modelYear: data.laptop_obj.model_year,
      price: data.laptop_obj.price,
      romSize: data.laptop_obj.rom_size,
      ramSize: data.laptop_obj.ram_size,
    };
    return { laptopObj, message: data.message };
  }
  return { message: 'Laptop already exists' };
});

export const destroyLaptop = createAsyncThunk('laptops/destroyLaptop', async (id, { dispatch }) => {
  const response = await axios.delete(`https://laptopreservation.onrender.com/api/v1/laptops/${id}`, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const { data } = response;
  if (data.message === 'Laptop has been destroyed successfully!') {
    dispatch(setRemoveReservationsAction(id));
    return id;
  }
  throw new Error('Laptop deletion failed');
});

const laptopsSlice = createSlice({
  name: 'laptops',
  initialState,
  reducers: {
    clear: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaptops.fulfilled, (state, action) => {
        state.laptops = action.payload;
      })
      .addCase(addLaptop.fulfilled, (state, action) => {
        if (action.payload.laptopObj) {
          state.laptops.push(action.payload.laptopObj);
          state.message = action.payload.message;
        } else {
          state.message = action.payload.message;
        }
      })
      .addCase(destroyLaptop.fulfilled, (state, action) => {
        state.laptops = state.laptops.filter((item) => item.id !== action.payload);
      });
  },
});

export const { clear } = laptopsSlice.actions;

export default laptopsSlice.reducer;
