// src/features/logo/logoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";


// Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_CONFIG_API_KEY,
  authDomain: "starry-iris-442614-c1.firebaseapp.com",
  projectId: "starry-iris-442614-c1",
  storageBucket: "starry-iris-442614-c1.appspot.com",
  messagingSenderId: "YOU437525971388",
  appId: process.env.REACT_APP_FIREBASE_CONFIG_APPID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export const fetchImageFromStorage = createAsyncThunk(
    'fetchImageFromStorage', async() => {
      try {
        console.log('fetchImage')
        const snapshot = await getDocs(collection(db, "images")); // Fetch Firestore products collection
        if (snapshot.empty) {
          console.log("No matching documents.");
        } else {
          console.log("Documents found:", snapshot)
        }

        const images = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const data = doc.data();
            const imageRef = ref(storage, data.image); // Reference to the storage object
            const imageURL = await getDownloadURL(imageRef); // Generate a public URL for the image       
            console.log(imageURL)
            return {
              ...data,
              image: imageURL, // Replace gs:// path with public URL
            };
          })
        )
      return images;      
      }
      catch(error) {
        console.log("Error fetching the image:", error)
      }
    }
)

// Create the slice
const logoSlice = createSlice({
  name: 'logo',
  initialState: {
    images: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImageFromStorage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImageFromStorage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload; // Store URL here
      })
      .addCase(fetchImageFromStorage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectImages = (state) => state.logo;
export const selectImagesStatus = (state) => state.logo;
export default logoSlice.reducer;
