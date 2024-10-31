// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import cakeReducer from '../features/cake/cakeSlice';
import jumbotronReducer from '../features/jumbotron/jumbotronSlice';

export const store = configureStore({
  reducer: {
    cakes: cakeReducer,
    jumbotron: jumbotronReducer
  },
});
