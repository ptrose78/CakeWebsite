// src/features/product/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Firebase project configuration
const firebaseConfig = {
  apiKey: "zaSyDa6fefG9o1U7NNfHs4Ei9LDZomiv19xj8",
  authDomain: "starry-iris-442614-c1.firebaseapp.com",
  projectId: "starry-iris-442614-c1",
  storageBucket: "starry-iris-442614-c1.appspot.com",
  messagingSenderId: "YOU437525971388",
  appId: "YOU1:437525971388:ios:c0031a49681fd0bdfeabb9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Create async thunk to fetch products from Firestore
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  try {
    const snapshot = await getDocs(collection(db, "products")); // Fetch Firestore products collection
    if (snapshot.empty) {
      console.log("No matching documents.");
    } else {
      console.log("Documents found:", snapshot)
    }
    const products = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = doc.data();
        const imageRef = ref(storage, data.image); // Reference to the storage object
        console.log(imageRef)
        const imageUrl = await getDownloadURL(imageRef); // Generate a public URL for the image
        console.log(imageUrl)

        return {
          id: doc.id,
          ...data,
          image: imageUrl, // Replace gs:// path with public URL
        };
      })
    );
    console.log(products)
    return products;
  } catch (error) {
    throw new Error("Error fetching product data");
  }
});

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
