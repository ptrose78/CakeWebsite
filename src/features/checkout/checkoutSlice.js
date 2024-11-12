import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customerInfo: {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: 'WI', // Default to Wisconsin
    zipcode: '',
    country: 'US', // Default to United States
  },
  orderInfo: {
    pickupDate: '',
    pickupTime: '',
    deliveryMethod: 'Store Pickup', // Default Pickup
  },
  accountCreation: false, // Track whether the user has agreed to the terms
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    updateCustomerInfo: (state, action) => {
      state.customerInfo = { ...state.customerInfo, ...action.payload };
    },
    updateOrderInfo: (state, action) => {
      state.orderInfo = { ...state.orderInfo, ...action.payload };
    },
    toggleAccountCreation: (state) => {
      state.termsAgreed = !state.termsAgreed;
    },
    resetCheckout: () => initialState, // Reset to initial state
  },
});

// Export the actions for dispatching
export const { updateCustomerInfo, updateOrderInfo, toggleAccountCreation, resetCheckout } = checkoutSlice.actions;

// Export the reducer to be used in the store
export default checkoutSlice.reducer;
