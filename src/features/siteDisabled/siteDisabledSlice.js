// src/redux/siteSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSiteDisabled: false, // Default state is 'false' meaning the site is not disabled
};

const siteDisabledSlice = createSlice({
  name: 'siteDisabled',
  initialState,
  reducers: {
    disableSite: (state) => {
      state.isSiteDisabled = true;
    },
    enableSite: (state) => {
      state.isSiteDisabled = false;
    },
    toggleSite: (state) => {
      state.isSiteDisabled = !state.isSiteDisabled;
    },
  }
});

export const { disableSite, enableSite, toggleSite } = siteDisabledSlice.actions;

export const selectIsSiteDisabled  = (state) => state.siteDisabled.isSiteDisabled;

export default siteDisabledSlice.reducer;
