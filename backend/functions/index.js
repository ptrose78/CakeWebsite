
require('dotenv').config();

// micro provides http helpers



// logger gives us insight into what's happening
const logger = require('../server/logger.js');

// schema validates incoming requests


const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp()

// require('dotenv').config();
const cors = require('cors')
const express = require('express');
// const { json } = require('micro');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({ origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/createContact', async (req, res) => {
  try {

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


// Expose Express API as a single Cloud Function:
exports.api  = functions.https.onRequest(app);

