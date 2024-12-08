
// Now you can use the `square` client to interact with the Square API in your routes

require('dotenv').config();
// micro provides http helpers
const { createError, json, send } = require('micro');
// microrouter provides http server routing
const { router, get, post } = require('microrouter');
// serve-handler serves static assets
const staticHandler = require('serve-handler');
// async-retry will retry failed API requests
const retry = require('async-retry');

// logger gives us insight into what's happening
const logger = require('./server/logger');
// schema validates incoming requests
const {
  validatePaymentPayload,
  validateCreateCardPayload,
} = require('./server/schema');
// square provides the API client and error types
const { ApiError, client: square } = require('./server/square');

// Set up CORS
const corsMiddleware = require('micro-cors')({
  origin: '*', // Allow requests from any origin
  allowMethods: ['POST', 'GET'], // Allow specific HTTP methods
});

console.log('front:',process.env.REACT_APP_API_URL_FRONT)
// Import the createEmail function
const { sendTransactionalEmail } = require('./createEmail.js');

// Import template for receipt
const receiptTemplate = require('./receiptTemplate');


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
   
async function createPayment(req, res) {
  const payload = await json(req);
  logger.debug(JSON.stringify(payload));
  
  //We validate the payload for specific fields. You may disable this feature
  //if you would prefer to handle payload validation on your own.
  // if (!validatePaymentPayload(payload)) {
  //   throw createError(400, 'Bad Request');
  // }

  const orderResults = await square.ordersApi.retrieveOrder(payload.orderId);
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
            const { result, statusCode } = await square.paymentsApi.createPayment(payment);
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
}

async function sendReceipt(customerId, orderId) {
  const responseCustomer = await square.customersApi.retrieveCustomer(customerId);
  const responseOrder = await square.ordersApi.retrieveOrder(orderId);

  // Assume `order` is the JSON object from your API
  const htmlContent = receiptTemplate(responseOrder.result.order);

    sendEmail(
      "Receipt from Buzzy Sweets",
      "Paul",
      process.env.EMAIL,
      htmlContent,
      responseCustomer.result.customer.emailAddress)
}



async function createCustomer(req, res) {
  console.log('createCustomer on backend')
 

  console.log(process.env.REACT_APP_API_URL_FRONT)


  const payload = await json(req);
  logger.debug(JSON.stringify(payload));

  // if (!validateCreateCustomerPayload(payload)) {
  //   console.log('error')
  //   throw createError(400, 'Bad Request');
  // }

  await retry(async (bail, attempt) => {
    try {
      logger.debug('Creating customer', { attempt });

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

        console.log('customerReq:', customerReq)
      const { result, statusCode } = await square.customersApi.createCustomer(customerReq);
      console.log('customer returned result:', result);
      console.log('customer returned statusCode:', statusCode)
     
      // Send the success response
      send(res, statusCode, {
        success: true,
        customer: {
          id: result.customer.id,
          status: result.customer.status,
        },
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
}

async function createOrder(req, res) {
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

    const { result, statusCode } = await square.ordersApi.createOrder(orderReq);
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
      bail(ex);
    } else {
      logger.error(`Unexpected Error: ${ex}`);
      throw ex;
    }
  }
}


async function storeCard(req, res) {
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
  
      const { result, statusCode } = await square.cardsApi.createCard(cardReq);
  
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
}

async function createContact(req, res) {
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
}

// Health Check Route
const healthCheck = async (req, res) => {
  send(res, 200, { status: 'healthy' });
};


// Define the routes
const appRouter = router(
  get('/health', healthCheck),
  post('/payment', createPayment),
  post('/customer', createCustomer),
  post('/card', storeCard),
  post('/order', createOrder),
  post('/contactForm', createContact)
);

const corsWrappedApp = corsMiddleware(appRouter);

// Ensure Cloud Run PORT is respected (used by micro CLI)
if (require.main === module) {
  const PORT = process.env.PORT || 8080; // Cloud Run sets PORT
  console.log(`Server running on port ${PORT}`);
  require('http')
    .createServer(corsWrappedApp)
    .listen(PORT); // micro won't call this automatically, so we do it here
}

// Export the wrapped function
module.exports = corsWrappedApp;
