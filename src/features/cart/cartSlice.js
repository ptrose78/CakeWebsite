import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage, or fall back to defaults
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    return serializedState ? JSON.parse(serializedState) : { orders: [], totalQuantity: 0, totalPrice: 0 };
  } catch (e) {
    console.error("Could not load cart from localStorage", e);
    return { orders: [], totalQuantity: 0, totalPrice: 0 };
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
    addOrder: (state, action) => {
      const { orders, newOrder } = action.payload;
      const existingOrder = state.orders.find((order) => order.id === newOrder.id);
      if (existingOrder) {
        existingOrder.quantity += newOrder.quantity;
      } else {
        state.orders.push(newOrder);
      }

      state.totalQuantity += newOrder.quantity;
      state.totalPrice += newOrder.price * newOrder.quantity;

      saveToLocalStorage(state); // Persist state after update
    },

    removeOrder: (state, action) => {
      const orderId = action.payload;
      const orderIndex = state.orders.findIndex((order) => order.id === orderId);

      if (orderIndex >= 0) {
        const order = state.orders[orderIndex];
        state.totalQuantity -= order.quantity;
        state.totalPrice -= order.price * order.quantity;

        state.orders.splice(orderIndex, 1);
      }

      saveToLocalStorage(state); // Persist state after update
    },

    clearCart: (state) => {
      state.orders = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;

      saveToLocalStorage(state); // Persist cleared state
    },
  },
});

export const { addOrder, removeOrder, clearCart } = cartSlice.actions;

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
