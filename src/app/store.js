// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '../features/sidebar/sidebarSlice';
import jumbotronReducer from '../features/jumbotron/jumbotronSlice';
import cakeReducer from '../features/cake/cakeSlice';
import logoReducer from '../features/logo/logoSlice';
import dropdownMenuReducer from '../features/dropdownMenu/dropdownMenuSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    jumbotron: jumbotronReducer,
    cakes: cakeReducer,
    logo: logoReducer,
    dropdownMenu: dropdownMenuReducer,
  },
});
