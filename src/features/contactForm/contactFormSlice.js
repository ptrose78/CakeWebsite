import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const postContactForm = createAsyncThunk(
  'contactform/postContactForm',
  async (contact) => {
    console.log('createContact');
    console.log('Contact payload:', JSON.stringify(contact)); 
    try {
      console.log(process.env.REACT_APP_API_URL_BACK);

      const response = await fetch(`${process.env.REACT_APP_API_URL_BACK}/create-contact`, {
        method: 'POST',            
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      console.log(response)
      return response;
    } catch (error) {
      console.log('Error posting contact form:', error)
      throw error;
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
      {
      state.name = { first: '', last: '' };
      state.email = '';
      state.address = {street: '', addressLine2: '', city: '', state: '', zip: ''};
      state.phone = '';
      state.message = '';
      state.humanCheck = '';
      state.isSubmitVisible = false; // Determines visibility of the submit button
      state.submissionResult = '';
    }
    console.log("state:", state.name)
    }
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
