import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage, or fall back to defaults
const loadFromLocalStorage = () => {
    try {
  
      // localStorage.clear();

      const serializedState = localStorage.getItem('checkout');
      return serializedState ? JSON.parse(serializedState) : {
        customerInfo: {
          emailAddress: '',
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
        accountCreation: false, 
      };
    } catch (e) {
      console.error("Could not load cart from localStorage", e);
      return null;
    }
  };
  
  const saveToLocalStorage = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('checkout', serializedState);
    } catch (e) {
      console.error("Could not save cart to localStorage", e);
    } 
  } 

  const getInitialState = () => {
    const savedState = loadFromLocalStorage();
    console.log('savedState', savedState)
    return savedState || {
      customerInfo: {
        emailAddress: '',
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
      accountCreation: false, 
    };
  };

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: getInitialState(),
  reducers: {
    updateCustomerInfo: (state, action) => {
      state.customerInfo = { ...state.customerInfo, ...action.payload };
      saveToLocalStorage(state); // Persist state after update
    },
    updateOrderInfo: (state, action) => {
      state.orderInfo = { ...state.orderInfo, ...action.payload };
      saveToLocalStorage(state); // Persist state after update
    },
    toggleAccountCreation: (state) => {
      state.accountCreation = !state.accountCreation;
      saveToLocalStorage(state); // Persist state after update
    },
    resetCheckout: (state) => {
      state.customerInfo.emailAddress = '';
      state.customerInfo.firstName = '';
      state.customerInfo.lastName = '';
      state.customerInfo.phone = '';
      state.customerInfo.address = '';
      state.customerInfo.city = '';
      state.customerInfo.state = 'WI'; // Default to Wisconsin
      state.customerInfo.zipcode = '';
      state.customerInfo.country = 'US'; // Default to United States

      state.orderInfo.pickupDate = '';
      state.orderInfo.pickupTime = '';
      state.orderInfo.deliveryMethod = 'Store Pickup'; // Default to Store Pickup

      state.accountCreation = false;
    
      console.log("State of checkout:", state.customerInfo);
      const serializedState = JSON.stringify(state);
      localStorage.setItem('checkout', serializedState);
   },
  }
});

// Export the actions for dispatching
export const { updateCustomerInfo, updateOrderInfo, toggleAccountCreation, resetCheckout } = checkoutSlice.actions;

export const selectCheckout = (state) => state.checkout;

// Export the reducer to be used in the store
export default checkoutSlice.reducer;
