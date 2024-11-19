// src/features/cakeOrder/cakeOrderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = 
    {   name:"",
        image: "",
        id: "",
        layerSize: "",
        flavor: "",
        buttercreamColor: "",
        alcohol: "",
        notes: "",
        quantity: 1,
        price: ""
    }

const cupcakeOrderFormSlice = createSlice({
    name: 'cupcakeOrderForm',
    initialState,
    reducers: {
        setName: (state, action) => {state.name = action.payload},
        setImage: (state, action) => {state.image = action.payload},
        setId: (state, action) => { state.id = action.payload; },
        setFlavor: (state, action) => { state.flavor = action.payload; },
        setButtercreamColor: (state, action) => { state.buttercreamColor = action.payload; },
        setAlcohol: (state, action) => {state.alcohol = action.payload},
        setNotes: (state, action) => { state.notes = action.payload; },
        setQuantity: (state, action) => { state.quantity = action.payload; },
        setPrice: (state, action) => { state.price = action.payload; },
        clearOrder: (state) => Object.assign(state, initialState),
    },
});

export const { setName, setImage, setId, setLayerSize, setFlavor, setButtercreamColor, setAlcohol, setCakeMessage, setNotes, setQuantity, setPrice, clearOrder } = cupcakeOrderFormSlice.actions;

export const selectCupcakeOrderForm = (state) => state.cupcakeOrderForm;

export default cupcakeOrderFormSlice.reducer;