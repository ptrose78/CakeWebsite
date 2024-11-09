// src/features/cakeOrder/cakeOrderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    layerSize: "",
    flavor: "",
    buttercreamColor: "",
    cakeMessage: "",
    messageFee: 5, // if applicable
    notes: "",
};

const cakeOrderFormSlice = createSlice({
    name: 'cakeOrderForm',
    initialState,
    reducers: {
        setLayerSize: (state, action) => { state.layerSize = action.payload; },
        setFlavor: (state, action) => { state.flavor = action.payload; },
        setButtercreamColor: (state, action) => { state.buttercreamColor = action.payload; },
        setCakeMessage: (state, action) => { state.cakeMessage = action.payload; },
        setNotes: (state, action) => { state.notes = action.payload; },
        clearOrder: (state) => Object.assign(state, initialState),
    },
});

export const { setLayerSize, setFlavor, setButtercreamColor, setCakeMessage, setNotes, clearOrder } = cakeOrderFormSlice.actions;

export const selectCakeOrderForm = (state) => state.cakeOrderForm;

export default cakeOrderFormSlice.reducer;
