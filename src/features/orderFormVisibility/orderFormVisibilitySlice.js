// src/features/orderFormVisibility/orderFormVisibilitySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isVisible: false,
    selectedProduct: null,
};

const orderFormVisibilitySlice = createSlice({
    name: 'orderFormVisibility',
    initialState,
    reducers: {
        showOrderForm: (state, action) => {
            state.isVisible = true;
            state.selectedProduct = action.payload;
        },
        hideOrderForm: (state) => {
            state.isVisible = false;
            state.selectedProduct = null;
        },
    },
});

export const { showOrderForm, hideOrderForm } = orderFormVisibilitySlice.actions;
export const selectOrderFormVisibility = (state) => state.orderFormVisibility.isVisible;
export const selectSelectedProduct = (state) => state.orderFormVisibility.selectedProduct;

export default orderFormVisibilitySlice.reducer;
