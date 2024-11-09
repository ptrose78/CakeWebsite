// src/features/paymentForm/paymentFormSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  error: null,
  payment: null,
};

const paymentFormSlice = createSlice({
  name: 'paymentForm',
  initialState,
  reducers: {
    startPayment: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    paymentSuccess: (state, action) => {
      state.status = 'succeeded';
      state.payment = action.payload;
    },
    paymentFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { startPayment, paymentSuccess, paymentFailure } = paymentFormSlice.actions;

export default paymentFormSlice.reducer;
