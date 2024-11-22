import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    googleLogin: (state, action) => {
      state.token = action.payload; // Save the JWT token
      // You can decode the token and set user details here if needed
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { googleLogin, logout } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
