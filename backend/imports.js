import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
// import products from "./firestoreImport.json" assert { type: 'json' }; // Import the JSON file
import { readFile } from 'fs/promises';

// Firebase project configuration
const firebaseConfig = {
  apiKey: "zaSyDa6fefG9o1U7NNfHs4Ei9LDZomiv19xj8",
  authDomain: "starry-iris-442614-c1.firebaseapp.com",
  projectId: "starry-iris-442614-c1",
  storageBucket: "starry-iris-442614-c1.appspot.com",
  messagingSenderId: "YOU437525971388",
  appId: "YOU1:437525971388:ios:c0031a49681fd0bdfeabb9",
};

async function loadProducts() {
    return JSON.parse(await readFile('./firestoreImport.json', 'utf-8'));
  }
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Upload data to Firestore
const uploadData = async () => {
    try {
        const products = await loadProducts();

        const productEntries = Object.entries(products.products); // Convert to array of [key, value] pairs

        for (const [id, product] of productEntries) {
            const docRef = doc(db, "products", id); // Use the product ID as the document ID
            await setDoc(docRef, product); // Upload the product data
            console.log(`Uploaded product with ID: ${id}`);
          }
      
          console.log("All products uploaded successfully.");

    } catch (error) {
        console.error("Error uploading data: ", error);
    }
};


uploadData();
