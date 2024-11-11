// src/features/cakeOrder/cakeOrderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = 
    {   name:"",
        image: "",
        id: "",
        layerSize: "",
        flavor: "",
        buttercreamColor: "",
        cakeMessage: "",
        notes: "",
        quantity: 1,
        price: ""
    }

const cakeOrderFormSlice = createSlice({
    name: 'cakeOrderForm',
    initialState,
    reducers: {
        setName: (state, action) => {state.name = action.payload},
        setImage: (state, action) => {state.image = action.payload},
        setId: (state, action) => { state.id = action.payload; },
        setLayerSize: (state, action) => { state.layerSize = action.payload; },
        setFlavor: (state, action) => { state.flavor = action.payload; },
        setButtercreamColor: (state, action) => { state.buttercreamColor = action.payload; },
        setCakeMessage: (state, action) => { state.cakeMessage = action.payload; },
        setNotes: (state, action) => { state.notes = action.payload; },
        setQuantity: (state, action) => { state.quantity = action.payload; },
        setPrice: (state, action) => { state.price = action.payload; },
        clearOrder: (state) => Object.assign(state, initialState),
    },
});

export const { setName, setImage, setId, setLayerSize, setFlavor, setButtercreamColor, setCakeMessage, setNotes, setQuantity, setPrice, clearOrder } = cakeOrderFormSlice.actions;

export const selectCakeOrderForm = (state) => state.cakeOrderForm;

export default cakeOrderFormSlice.reducer;