// src/features/dropdownmenu/dropdownmenuSlice.js
import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({ 
    name: 'sidebar',
    initialState : {
        isMenuOpen: false,
    },
    reducers: {
        openMenu: (state) => {
            state.isMenuOpen = true;
        },
        closeMenu: (state) => {
            state.isMenuOpen = false;
        }
    }
});

export const selectIsMenuOpen = (state) => state.sidebar.isMenuOpen;

export const { openMenu, closeMenu } = sidebarSlice.actions;

export default sidebarSlice.reducer;
