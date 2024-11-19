// src/features/product/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const response = await axios.get('wp-json/custom/v1/productdata');
      return response.data;
    } catch (error) {
      throw Error ('Error fetching the product prices');
    } 
  }
);

const productListSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    filteredItems: [],
    filters: {
      category: null,
      price: null,
      type: null,
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
      state.filteredItems = state.items.filter(
        product => product.category === action.payload
      );
    },
    setPriceFilter: (state, action) => {
      state.filters.price = action.payload;
      state.filteredItems = state.items.filter(product => 
        (!state.filters.category || product.category === state.filters.category) &&
        product.price <= action.payload
      );
    },
    setTypeFilter: (state, action) => {
      state.filters.type = action.payload;
      state.filteredItems = state.items.filter(product => 
        (!state.filters.category || product.category === state.filters.category) &&
        (!state.filters.price || product.price <= state.filters.price) &&
        product.type === action.payload
      );
    },
    resetFilters: (state) => {
      state.filters = { category: null, price: null, type: null };
      state.filteredItems = state.items;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

export const { setCategoryFilter, setPriceFilter, setTypeFilter, resetFilters } = productListSlice.actions;

export const selectFilteredProducts = (state) => state.products.filteredItems;

export default productListSlice.reducer;
