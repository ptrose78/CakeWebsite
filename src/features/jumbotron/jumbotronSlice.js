import { createSlice } from '@reduxjs/toolkit';

export const jumbotronSlice = createSlice({
  name: 'jumbotron',
  initialState: {
    headline: "Welcome to Betty's Bakes!",
    subtext: "Delicious cakes made with love, for every occasion!",
  },
  reducers: {
    updateJumbotron: (state, action) => {
      state.headline = action.payload.headline || state.headline;
      state.subtext = action.payload.subtext || state.subtext;
    }
  }
});

export const selectJumbotron = (state) => state.jumbotron;
export const { updateJumbotron } = jumbotronSlice.actions;
export default jumbotronSlice.reducer;
