// Import the client from the config file
const { client } = require('./config');
const { ApiError } = require('square');

// Example function to list customers
(async () => {
  try {
    // Using the Square API client to list customers
    const { result, statusCode } = await client.customersApi.listCustomers();
    console.log('Customers retrieved successfully:', result.customers);
  } catch (ex) {
    // Handle errors
    if (ex instanceof ApiError) {
      console.error('API Error:', ex.errors);
    } else {
      console.error('Unexpected Error:', ex);
    }
  }
})();

module.exports = { ApiError: client.ApiError, client };
