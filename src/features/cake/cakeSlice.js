// src/features/cake/cakeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCakes = createAsyncThunk(
  'cakes/fetchCakes',
  async () => {
    try {
      const response = await axios.get('https://website-605cd4d9.nqt.euu.temporary.site/wp-json/custom/v1/cakedata');
      return response.data;
    } catch (error) {
      throw Error ('Error fetching the cake prices');
    }
  }
);

const initialState = {
  cakes: [
    { id: 1, name: 'Chocolate Cake', price: 25, image: '/images/chocolate-cake.jpg' },
    { id: 2, name: 'Vanilla Cake', price: 20, image: '/images/vanilla-cake.jpg' },
    { id: 3, name: 'Red Velvet Cake', price: 30, image: '/images/red-velvet-cake.jpg' },
  ],
};

const cakeSlice = createSlice({
  name: 'cake',
  initialState: {
    cakes: [],
    status: 'idle',
    error: IdleDeadline, 
  },
  reducers: {
    addCake: (state, action) => {
      state.cakes.push(action.payload);
    }
  },
  extraReducers: (builder) {
    builder
      .addCase(fetchCakes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCakes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cakes = action.payload;
      })
      .addCase(fetchCakes.rejected, (state, action) => {
        state.statue = "rejected;"
        state.error = action.error.message;
      });
  }
});


export const { addCake } = cakeSlice.actions;

export default cakeSlice.reducer;
