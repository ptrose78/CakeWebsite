/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   console.log('hello')
//   response.send("Hello from Firebase!");
// });


const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp()

// require('dotenv').config();
const cors = require('cors')
const express = require('express');
// const { json } = require('micro');
const bodyParser = require('body-parser');
const { Client, ApiError } = require('square');
const app = express();

app.use(cors({ origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Set up the Square API client dynamically based on the environment
const client = new Client({
  environment: "sandbox",
  accessToken: 'EAAAl_JrfxJ5bgMFUHZ9u2q7zQnZ0UIO3-TL5Ia7Mmsi-fNKB2FkphQvI_B3jNoQ', // Square Access Token from environment
});

// Utility to handle BigInt serialization
function handleBigInt(obj) {
    return JSON.parse(
      JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      )
    );
  }

app.get('/createCustomer', async (req, res) => {  
   
    console.log('post /')

    const customersApi = client.customersApi;
    const customerReq = {
        address: {
            addressLine1: '8021 S WARING DR',
            locality: 'US',
            postalCode: '53154',
            firstName: 'Paul',
            lastName: 'Rose'
          },
          idempotencyKey: '0a0a6701-1b07-49ba-bb70-94ce04b6f1bb',
          familyName: 'Rose',
          emailAddress: 'prose100@hotmail.com',
      }

    try {
        console.log("Square before")
        const response = await customersApi.createCustomer(customerReq);
          // Use the utility to handle BigInt values
        const safeResponse = handleBigInt(response.result);
        console.log(safeResponse)
        res.status(200).json(safeResponse);

    } catch (error) {
        let errorResult = null;
        if (error instanceof ApiError) {
            console.log("error instanceof ApiError")
            errorResult = error.errors;
        } else {
            console.log("error NOT instanceof ApiError")
            errorResult = error;
        }
        res.status(500).json({
            'title': 'Payment Failure',
            'result': errorResult,
        });
    }
});

// // Start the server
// const PORT = process.env.PORT || 5000; // Use the environment port or fallback to 5000
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


// Expose Express API as a single Cloud Function:
exports.api  = functions.https.onRequest(app);