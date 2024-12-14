
require('dotenv').config();

// micro provides http helpers
const { createError, json, send } = require('micro');

// async-retry will retry failed API requests
const retry = require('async-retry');

// logger gives us insight into what's happening
const logger = require('../server/logger.js');
// schema validates incoming requests
const {
  validateCreateCardPayload,
} = require('../server/schema.js');

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


// Import the createEmail function
const { sendTransactionalEmail } = require('../createEmail.js');

// Import template for receipt
const receiptTemplate = require('../receiptTemplate.js');

//Send email after a payment completes
const sendEmail = (subject, senderName, senderEmail, htmlContent, recipientEmail) => {
  return sendTransactionalEmail(subject, senderName, senderEmail, htmlContent, recipientEmail)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
    }
   
app.post('/createPayment', async (req, res) => {
  const payload = await json(req);
  logger.debug(JSON.stringify(payload));
  
  //We validate the payload for specific fields. You may disable this feature
  //if you would prefer to handle payload validation on your own.
  // if (!validatePaymentPayload(payload)) {
  //   throw createError(400, 'Bad Request');
  // }

  const orderResults = await client.ordersApi.retrieveOrder(payload.orderId);
  const amountDue = orderResults.result.order.netAmountDueMoney;

 // Retry logic for payment creation
 try {
  await retry(async (bail, attempt) => {
    try {
      logger.debug('Attempting payment creation', { attempt });

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

      if (payload.customerId) {
        payment.customerId = payload.customerId;
      }

      // VerificationDetails is part of Secure Card Authentication.
      // This part of the payload is highly recommended (and required for some countries)
      // for 'unauthenticated' payment methods like Cards.
     
      if (payload.verificationToken) {
        payment.verificationToken = payload.verificationToken;
      }

      // Function to handle payment creation
        const sendPayment = async () => {
          try {
            const { result, statusCode } = await client.paymentsApi.createPayment(payment);
            logger.info('Payment succeeded!', { result, statusCode });

            if (statusCode === 200) {
              // Payment succeeded, respond with payment details
              if (!res.headersSent) {
                send(res, statusCode, {
                  success: true,
                  payment: {
                    id: result.payment.id,
                    status: result.payment.status,
                    receiptUrl: result.payment.receiptUrl,
                    orderId: result.payment.orderId,
                  },
                });
              }
              sendEmail(
                "Order Placed!",
                "Paul",
                process.env.EMAIL,
                "<p>Check the Square App for the order's details.</p>",
                process.env.EMAIL)

            sendReceipt(payload.customerId, payload.orderId)

            } else {
              // Handle non-200 status codes (Payment failed)
              if (!res.headersSent) {
                send(res, statusCode, {
                  success: false,
                  error: "Payment failed or was not successful",
                });
              }
            }
          } catch (error) {
            if (!res.headersSent) {
              send(res, 500, {
                success: false,
                error: "Internal Server Error during payment process",
              });
            }
          }
        };

        // Call the sendPayment function
        await sendPayment();  // Ensure payment is sent immediately

      } catch (error) {
        if (error instanceof ApiError) {
          // Handle specific API errors that may require retry
          logger.error(error.errors);
          bail(error);  // Bail from the retry loop on certain errors
        } else {
          // Log and retry for other errors
          logger.error(`Payment attempt failed: ${error}`);
          throw error;  // Allow retry by rethrowing the error
        }
      }
    });

  } catch (err) {
    // Catch and handle retry failures after all attempts
    if (!res.headersSent) {
      send(res, 500, {
        success: false,
        error: "Failed to create payment after retries",
      });
    }
  }
})

async function sendReceipt(customerId, orderId) {
  const responseCustomer = await client.customersApi.retrieveCustomer(customerId);
  const responseOrder = await client.ordersApi.retrieveOrder(orderId);

  // Assume `order` is the JSON object from your API
  const htmlContent = receiptTemplate(responseOrder.result.order);

    sendEmail(
      "Receipt from Buzzy Sweets",
      "Paul",
      process.env.EMAIL,
      htmlContent,
      responseCustomer.result.customer.emailAddress)
}

app.post('/createCustomer', async (req, res) => {  
   
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
          idempotencyKey: '17bd8bd1-7c6a-4088-b135-ffaf0eb62fc7',
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

app.post('/createOrder', async (req, res) => {
  try {
    const payload = await json(req);
    const orderReq = {
      order: {
        locationId: payload.order.locationId,
        referenceId: 'my-order-001',
        lineItems: payload.order.lineItems,
      },
      idempotencyKey: payload.idempotencyKey,
    };

    const { result, statusCode } = await client.ordersApi.createOrder(orderReq);
    console.log('create order on backend:', result)

    const serializedResult = JSON.stringify(result, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    );

    send(res, statusCode, {
      success: true,
      order: JSON.parse(serializedResult),
    });
  } catch (ex) {
    if (ApiError && ex instanceof ApiError) {
      logger.error("API Error:", ex.errors);
    } else {
      logger.error(`Unexpected Error: ${ex}`);
      throw ex;
    }
  }
});

app.post('/storeCard', async (req, res) => {
  const payload = await json(req);

  if (!validateCreateCardPayload(payload)) {
    throw createError(400, 'Bad Request');
  }

  await retry(async (bail, attempt) => {
    try {
      logger.debug('Storing card', { attempt });
  
      const cardReq = {
        idempotencyKey: payload.idempotencyKey,
        sourceId: payload.sourceId,
        card: {
          customerId: payload.customerId,
        },
      };
  
      const { result, statusCode } = await client.cardsApi.createCard(cardReq);
  
      // Process the result here
      result.card.expMonth = result.card.expMonth.toString();
      result.card.expYear = result.card.expYear.toString();
      result.card.version = result.card.version.toString();
  
      // Send the success response
      send(res, statusCode, {
        success: true,
        card: result.card,
      });

      return;
  
    } catch (ex) {
      // Handle API errors separately
      if (ex instanceof ApiError) {
        logger.error("API Error:", ex.errors);
        bail(ex);  // Prevent retrying if it's a valid error (e.g., invalid request)
      } else {
        // For unexpected errors (like network issues), retry the operation
        logger.error(`Error creating card-on-file on attempt ${attempt}: ${ex}`);
        throw ex; // This will trigger a retry in the retry logic.
      }
    }
  });
});

app.post('/createContact', async (req, res) => {
  try {
    const contact = await json(req);
    logger.debug(JSON.stringify(contact));
    console.log('Contact data received:', contact);   

    const response = await sendEmail(
      "Contact Form Submission",
      "Paul",
      process.env.EMAIL,
      `<p>Name: ${contact.name.first}  ${contact.name.last}</p>
       <p>Email: ${contact.email}</p>
       <p>Message: ${contact.message}</p>`,
      process.env.EMAIL
    );

    logger.info('Email sent successfully:', response);

    // Send success response back to the client
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, message: 'Email sent successfully' }));
  } catch (error) {
    logger.error('Error sending email:', error);

    // Send error response back to the client
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: 'Failed to send email' }));
  }
})

// Health Check Route
app.get('/healthCheck', async (req, res) => { 
  send(res, 200, { status: 'healthy' });
});


// Expose Express API as a single Cloud Function:
exports.api  = functions.https.onRequest(app);

