// src/features/logo/logoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Asynchronous thunk for fetching the image
export const fetchLogoImages = createAsyncThunk('logo/fetchLogoImages', async () => {
  const imageUrls = [
    '/cms/wp-content/uploads/2024/11/siteLogo.jpg',
    '/cms/wp-content/uploads/2024/11/siteLogo02.jpg'
  ];

  // Fetch both images in parallel
  const responses = await Promise.all(
    imageUrls.map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
      }
      const blob = await response.blob();
      return URL.createObjectURL(blob); // Create blob URLs for the images
    })
  );

  return responses; // Returns an array of blob URLs
});

// Create the slice
const logoSlice = createSlice({
  name: 'logo',
  initialState: {
    logoImages: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogoImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLogoImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.logoImages = action.payload; // Store blob URL here
      })
      .addCase(fetchLogoImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectLogoImages = (state) => state.logo;
export const selectLogoStatus = (state) => state.logo;
export default logoSlice.reducer;
