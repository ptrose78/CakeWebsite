// src/features/dropdownMenu/dropdownMenuSlice.js
import { createSlice } from '@reduxjs/toolkit';

const dropdownMenuSlice = createSlice({
    name: 'dropdownMenu',
    initialState: { 
        menus: {
            menu1: false,
            menu2: false,
        }
    },
    reducers: {
        toggleMenu: (state, action) => {
            const menuId = action.payload;
            state.menus[menuId] = !state.menus[menuId];
        }
    }
});

export const { toggleMenu } = dropdownMenuSlice.actions;
export const selectMenuState = (state, menuId) => state.dropdownMenu.menus[menuId];

export default dropdownMenuSlice.reducer;