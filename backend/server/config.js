// Load the environment variables dynamically based on NODE_ENV
require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.sandbox', // Dynamically choose .env file based on NODE_ENV
});

const { Client, Environment } = require('square');

// Set up the Square API client dynamically based on the environment
const client = new Client({
  environment: process.env.NODE_ENV === 'production' ? Environment.Production : Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN, // Square Access Token from environment
});

module.exports = {
  client,
  isProduction: process.env.NODE_ENV === 'production',
};
