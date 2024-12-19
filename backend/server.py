from flask import Flask, request, jsonify
from dotenv import load_dotenv
from square.client import Client
from square.http.auth.o_auth_2 import BearerAuthCredentials
import os

app = Flask(__name__)

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
    environment='sandbox'  # Use 'production' for a live account
)

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the API. Use the appropriate endpoints to interact.", 200

# Create Customer
@app.route('/create-customer', methods=['POST'])
def create_customer():
    try:
        # Get the JSON body from the frontend
        customer_data = request.json

        # Call the Square API to create a customer
        result = client.customers.create_customer(body=customer_data)

        if result.is_success():
            return jsonify({"success": True, "data": result.body}), 200
        else:
            return jsonify({"success": False, "errors": result.errors}), 400
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    # Use the environment variable PORT, default to 8080 if not set
    port = os.getenv('PORT', 8080)
    app.run(host='0.0.0.0', port=port)
