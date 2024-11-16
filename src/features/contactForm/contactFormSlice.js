import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const postContactForm = createAsyncThunk(
  'contactform/postContactForm',
  async (contact) => {
    try {
      const response = await fetch('http://localhost:3000/contactForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact) 
      })
      console.log(response)
      return response;
    } catch (error) {
      console.log('Error posting contact form')
      throw Error ('Error posting the contact form');
    }
  }
)

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
  submissionResult: ''
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
  extraReducers: (builder) => {
    builder
      .addCase(postContactForm.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postContactForm.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.submissionResult = action.payload.ok;
      })
      .addCase(postContactForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { updateField, checkHuman, resetForm } = contactFormSlice.actions;
export const selectContactForm = (state) => state.contactForm;
export default contactFormSlice.reducer;
