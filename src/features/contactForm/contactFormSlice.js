import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: { first: '', last: '' },
  email: '',
  address: {
    street: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
  },
  phone: '',
  message: '',
  humanCheck: '',
  isSubmitVisible: false, // Determines visibility of the submit button
};

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState,
  reducers: {
    updateField(state, action) {
      const { field, value } = action.payload;
      if (field.includes('.')) {
        // Handle nested fields
        const [parent, child] = field.split('.');
        state[parent][child] = value;
      } else {
        state[field] = value;
      }
    },
    checkHuman(state) {
      state.isSubmitVisible = state.humanCheck.trim() === '2'; // Correct answer for 1+1
    },
    resetForm(state) {
      return initialState; // Reset to initial state
    },
  },
});

export const { updateField, checkHuman, resetForm } = contactFormSlice.actions;
export const selectContactForm = (state) => state.contactForm;
export default contactFormSlice.reducer;
