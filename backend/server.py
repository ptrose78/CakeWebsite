from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from square.client import Client
from square.http.auth.o_auth_2 import BearerAuthCredentials
import os
import logging

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Set up logging
logging.basicConfig(level=logging.DEBUG)  # You can change this to INFO or ERROR depending on your needs
logger = logging.getLogger(__name__)

# Load environment variables from .env
load_dotenv()

# Retrieve the access token from environment variables
access_token = os.environ.get('SQUARE_ACCESS_TOKEN')
if not access_token:
    raise EnvironmentError("SQUARE_ACCESS_TOKEN is not set.")

# Initialize the Square client
client = Client(
    bearer_auth_credentials=BearerAuthCredentials(
        access_token=access_token
    ),
    environment='production'  # Use 'production' for a live account
)

@app.route('/', methods=['GET'])
def home():
    logger.info("Home route accessed")
    return "Welcome to the API. Use the appropriate endpoints to interact.", 200

# Create Customer
@app.route('/create-customer', methods=['POST'])
def create_customer():
    try:
          # Get the JSON body from the frontend
        customer_data = request.json
        logger.debug("Received customer data: %s", customer_data)

        # Call the Square API to create a customer
        result = client.customers.create_customer(body=customer_data)

        if result.is_success():
            logger.info("Customer created successfully: %s", result.body)
            return jsonify({"success": True, "data": result.body}), 200
        else:
            logger.warning("Error creating customer: %s", result.errors)
            return jsonify({"success": False, "errors": result.errors}), 400
    except Exception as e:
        logger.error("Error in create_customer: %s", str(e))
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    # Use the environment variable PORT, default to 8080 if not set
    port = os.getenv('PORT', 8080)
    logger.info("Starting Flask app on port %s", port)
    app.run(host='0.0.0.0', port=port)