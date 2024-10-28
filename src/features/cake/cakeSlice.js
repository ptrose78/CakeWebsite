// src/features/cake/cakeSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCakes = async () => {
  try {
      const response = await axios.get('http://localhost:3000/api/cakes');
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.error('Error fetching the cake prices', error);
  }
}

const initialState = {
  cakes: [
    { id: 1, name: 'Chocolate Cake', price: 25, image: '/images/chocolate-cake.jpg' },
    { id: 2, name: 'Vanilla Cake', price: 20, image: '/images/vanilla-cake.jpg' },
    { id: 3, name: 'Red Velvet Cake', price: 30, image: '/images/red-velvet-cake.jpg' },
  ],
};

const cakeSlice = createSlice({
  name: 'cake',
  initialState,
  reducers: {
    addCake: (state, action) => {
      state.cakes.push(action.payload);
    },
  },
});


export const { addCake } = cakeSlice.actions;

export default cakeSlice.reducer;
