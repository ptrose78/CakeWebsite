// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import cakeReducer from '../features/cake/cakeSlice';
import jumbotronReducer from '../features/jumbotron/jumbotronSlice';
import logoReducer from '../features/logo/logoSlice';

export const store = configureStore({
  reducer: {
    cakes: cakeReducer,
    jumbotron: jumbotronReducer,
    logo: logoReducer
  },
});
