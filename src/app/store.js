// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import cakeReducer from '../features/cake/cakeSlice';

export const store = configureStore({
  reducer: {
    cakes: cakeReducer,
  },
});
