
require('dotenv').config();

// micro provides http helpers



// logger gives us insight into what's happening
// const logger = require('../server/logger.js');

// schema validates incoming requests


const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp()

// require('dotenv').config();
const cors = require('cors')
const express = require('express');
// const { json } = require('micro');
const bodyParser = require('body-parser');

const { Client, Environment, ApiError } = require('square');
const client = new Client({
  environment: Environment.Production,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

const app = express();

app.use(cors({ origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Utility to handle BigInt serialization
function handleBigInt(obj) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  );
}

app.post('/createCustomer', async (req, res) => {
  const customersApi = client.customersApi;
  const customerReq = {
    address: {
        addressLine1: '8021 S WARING DR',
        locality: 'US',
        postalCode: '53154',
        firstName: 'Paul',
        lastName: 'Rose'
      },
      idempotencyKey: '17bd8bd1-7c6a-4088-b135-ffaf0eb62fc7',
      familyName: 'Rose',
      emailAddress: 'prose100@hotmail.com',
  }

  try {
    console.log('create Customer before')
    const response = await customersApi.createCustomer(customerReq);
     const safeResponse = handleBigInt(response.result);
            console.log(safeResponse)
            res.status(200).json(safeResponse);

  } catch(error) {
    let errorResult = null;
    if (error instanceof ApiError) {
      errorResult = error.errors;
    } else {
      errorResult = error;
    }
    res.status(500).json({
      'title': 'Payment Failure',
      'result': errorResult,
    });
  }
})

// Expose Express API as a single Cloud Function:
exports.api  = functions.https.onRequest(app);

