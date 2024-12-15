
require('dotenv').config();

// micro provides http helpers
const { json } = require('micro');

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
  bearerAuthCredentials: {
     accessToken: process.env.SQUARE_ACCESS_TOKEN
  },
  environment: Environment.Sandbox,
  httpClientOptions: {
    timeout: 10000,
    retryConfig: {
      maxNumberOfRetries: 3,
      maximumRetryWaitTime: 100000,
    }
  }
});

const app = express();

app.use(cors({ origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Import the createEmail function
// const { sendTransactionalEmail } = require('../createEmail.js');



// Utility to handle BigInt serialization
function handleBigInt(obj) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  );
}

//Send email after a payment completes
// const sendEmail = (subject, senderName, senderEmail, htmlContent, recipientEmail) => {
//   return sendTransactionalEmail(subject, senderName, senderEmail, htmlContent, recipientEmail)
//     .then((data) => {
//       return data;
//     })
//     .catch((error) => {
//       return error;
//     });
// }


app.post('/createPayment', async (req, res) => {
  const payload = await json(req);

  const paymentsApi = client.paymentsApi;
  
  //We validate the payload for specific fields. You may disable this feature
  //if you would prefer to handle payload validation on your own.
  // if (!validatePaymentPayload(payload)) {
  //   throw createError(400, 'Bad Request');
  // }

  const orderResults = await client.ordersApi.retrieveOrder(payload.orderId);
  const amountDue = orderResults.result.order.netAmountDueMoney;

 // Prepare payment object
 const payment = {
    idempotencyKey: payload.idempotencyKey,
    locationId: payload.locationId,
    sourceId: payload.sourceId,
    orderId: payload.orderId,
    // While it's tempting to pass this data from the client
    // Doing so allows bad actor to modify these values
    // Instead, leverage Orders to create an order on the server
    // and pass the Order ID to createPayment rather than raw amounts
    // See Orders documentation: https://developer.squareup.com/docs/orders-api/what-it-does
    amountMoney: amountDue
      // the expected amount is in cents, meaning this is $1.00.
      
      // If you are a non-US account, you must change the currency to match the country in which
      // you are accepting the payment.       
  };

// if (payload.customerId) {
//   payment.customerId = payload.customerId;
// }

// VerificationDetails is part of Secure Card Authentication.
// This part of the payload is highly recommended (and required for some countries)
// for 'unauthenticated' payment methods like Cards.

// if (payload.verificationToken) {
//   payment.verificationToken = payload.verificationToken;
// }

// Function to handle payment creation
  const sendPayment = async () => {
    try {
      const response = await paymentsApi.createPayment(payment);
      const safeResponse = handleBigInt(response.result);
      console.log(safeResponse);    
     
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
  };

  // Call the sendPayment function
  await sendPayment();  // Ensure payment is sent immediately
});         

app.post('/createCustomer', async (req, res) => {
  const payload = await json(req);

  const customersApi = client.customersApi;
  const customerReq = {
    address: {
      addressLine1: payload.address.address,
      firstName: payload.address.firstName,
      lastName: payload.address.lastName,
      country: payload.address.country,
      postalCode: payload.address.zipCode
    },
    emailAddress: payload.emailAddress,
    idempotencyKey: payload.idempotency_key,
    familyName: payload.familyName
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
        'title': 'Customer Failure',
        'result': errorResult,
      });
  }  
})

app.post('/createOrder', async (req, res) => {
 
  const payload = await json(req);
  const ordersApi = client.ordersApi;

  const orderReq = {
    order: {
      locationId: payload.order.locationId,
      referenceId:payload.order.referenceId,
      lineItems: payload.order.lineItems,
    },
    idempotencyKey: payload.idempotencyKey,
  };

  try {
    const response = await ordersApi.createOrder(orderReq);
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
        'title': 'Order Failure',
        'result': errorResult,
      });
    }   
});


// Expose Express API as a single Cloud Function:
exports.api  = functions.https.onRequest(app);

