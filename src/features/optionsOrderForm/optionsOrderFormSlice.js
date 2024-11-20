// src/features/optionsOrder/optionsOrderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = 
    {   name:"",
        image: "",
        id: "",
        layerSize: "",
        flavor: "",
        buttercreamColor: "",
        filling: "",
        alcohol: "",
        cakeMessage: "",
        notes: "",
        quantity: 1,
        price: ""
    }

const optionsOrderFormSlice = createSlice({
    name: 'optionsOrderForm',
    initialState,
    reducers: {
        setName: (state, action) => {state.name = action.payload},
        setImage: (state, action) => {state.image = action.payload},
        setId: (state, action) => { state.id = action.payload; },
        setLayerSize: (state, action) => { state.layerSize = action.payload; },
        setFlavor: (state, action) => { state.flavor = action.payload; },
        setButtercreamColor: (state, action) => { state.buttercreamColor = action.payload; },
        setFilling: (state, action) => { state.filling = action.payload; },
        setCakeMessage: (state, action) => { state.cakeMessage = action.payload; },
        setAlcohol: (state, action) => {state.alcohol = action.payload},
        setNotes: (state, action) => { state.notes = action.payload; },
        setQuantity: (state, action) => { state.quantity = action.payload; },
        setPrice: (state, action) => { state.price = action.payload; },
        clearOrder: (state) => Object.assign(state, initialState),
    },
});

export const { setName, setImage, setId, setLayerSize, setFlavor, setButtercreamColor, setFilling, setAlcohol, setCakeMessage, setNotes, setQuantity, setPrice, clearOrder } = optionsOrderFormSlice.actions;

export const selectOptionsOrderForm = (state) => state.optionsOrderForm;

export default optionsOrderFormSlice.reducer;