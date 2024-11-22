
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Asynchronous thunk for fetching the image
export const fetchJumbotronImage = createAsyncThunk('jumbotron/jumbotronImage', async () => {
    const imageUrl = '/cms/wp-content/uploads/2024/10/BettyBakes01.PNG';
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const blob = await response.blob();
    return URL.createObjectURL(blob); // Returns a blob URL for the image
  });

export const jumbotronSlice = createSlice({
  name: 'jumbotron',
  initialState: {
    jumbotronImage: null,
    headline: "Welcome to Buzzy Sweets!",
    subtext: "Delicious cakes made with love for every occasion!",
  },
  reducers: {
    updateJumbotron: (state, action) => {
      state.headline = action.payload.headline || state.headline;
      state.subtext = action.payload.subtext || state.subtext;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJumbotronImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJumbotronImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jumbotronImage = action.payload; // Store blob URL here
      })
      .addCase(fetchJumbotronImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectJumbotron = (state) => state.jumbotron;
export const { updateJumbotron } = jumbotronSlice.actions;
export default jumbotronSlice.reducer;
