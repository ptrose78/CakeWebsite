// src/features/cake/cakeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCakes = createAsyncThunk(
  'cakes/fetchCakes',
  async () => {
    try {
      const response = await axios.get('https://website-605cd4d9.nqt.euu.temporary.site/wp-json/custom/v1/cakedata');
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log('error fetchCakes')
      throw Error ('Error fetching the cake prices');
    } 
  }
);

const cakeSlice = createSlice({
  name: 'cakes',
  initialState: {
    cakes: [],
    status: 'idle',
    error: null, 
  },
  reducers: {
    addCake: (state, action) => {
      state.cakes.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCakes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCakes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cakes = action.payload;
      })
      .addCase(fetchCakes.rejected, (state, action) => {
        state.statue = "rejected";
        state.error = action.error.message;
      });
  }
});


export const { addCake } = cakeSlice.actions;
export const selectCakes = (state) => state.cakes.cakes;
export const selectCakesStatus = (state) => state.cakes.status;
export const selectCakesError = (state) => state.cakes.error;

export default cakeSlice.reducer;
