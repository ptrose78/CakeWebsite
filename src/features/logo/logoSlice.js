// src/features/logo/logoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Asynchronous thunk for fetching the image
export const fetchLogoImage = createAsyncThunk('logo/fetchLogoImage', async () => {
    const imageUrl = '/cms/wp-content/uploads/2024/11/siteLogo.png';
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const blob = await response.blob();
    return URL.createObjectURL(blob); // Returns a blob URL for the image
  });

// Create the slice
const logoSlice = createSlice({
  name: 'logo',
  initialState: {
    logoImage: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogoImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLogoImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.logoImage = action.payload; // Store blob URL here
      })
      .addCase(fetchLogoImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectLogoImage = (state) => state.logo;
export const selectLogoStatus = (state) => state.logo;
export default logoSlice.reducer;
