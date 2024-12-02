import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import products from "./firestoreImport.json"; // Import the JSON file

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

// Upload data to Firestore
const uploadData = async () => {
  try {
    const productsCollection = collection(db, "products");

    for (const product of products) {
      await addDoc(productsCollection, product);
      console.log(`Uploaded: ${product.name}`);
    }
    console.log("All products uploaded successfully!");
  } catch (error) {
    console.error("Error uploading data: ", error);
  }
};

uploadData();
