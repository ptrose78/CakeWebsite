import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage, or fall back to defaults
export const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    return serializedState ? JSON.parse(serializedState) : { items: [], totalQuantity: 0, totalPrice: 0 };
  } catch (e) {
    console.error("Could not load cart from localStorage", e);
    return { items: [], totalQuantity: 0, totalPrice: 0 };
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (e) {
    console.error("Could not save cart to localStorage", e);
  }
};

const initialState = loadFromLocalStorage();


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { items, newItem } = action.payload;
      console.log(items)
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      state.totalQuantity += newItem.quantity;
      state.totalPrice += newItem.price * newItem.quantity;

      saveToLocalStorage(state); // Persist state after update
    },

    removeItem: (state, action) => {
      const itemId = action.payload;
      console.log(state.items)
      const itemIndex = state.items.findIndex((item) => item.id === itemId);

      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.totalPrice = Math.abs(state.totalPrice);

        state.items.splice(itemIndex, 1);
      }

      saveToLocalStorage(state); // Persist state after update
    },
    updateTotalQuantityAndTotalPrice: (state, action) => {
      const {itemId, newQuantity} = action.payload;
      console.log(itemId)
      console.log(newQuantity)

      const itemIndex = state.items.findIndex((item) => item.id === itemId);

      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        if (newQuantity>0) {
          state.totalQuantity += newQuantity - item.quantity;
          state.totalPrice += item.price * (newQuantity - item.quantity);
          item.quantity = newQuantity;
        }
      }
      saveToLocalStorage(state); // Persist state after update
    },
    resetCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      console.log("state of cart", state.cart)
      saveToLocalStorage({ cart: state }); // Save only the checkout part of the state
    },
  },
});

export const { addItem, removeItem, updateTotalQuantityAndTotalPrice, resetCart } = cartSlice.actions;

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
