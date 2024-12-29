from quart import Quart, request, jsonify
from quart_cors import cors
from dotenv import load_dotenv
from square.client import Client
from square.http.auth.o_auth_2 import BearerAuthCredentials
import os
import logging
import asyncio

from createEmail import send_transactional_email
from receiptTemplate import receipt_template

app = Quart(__name__)

# Enable CORS for the app
app = cors(app, allow_origin="*")

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

@app.route("/", methods=["GET"])
async def home():
    return "Welcome to the Quart app!", 200

async def send_email(subject, sender_name, sender_email, html_content, recipient_email):
    try:
        data = await send_transactional_email(subject, sender_name, sender_email, html_content, recipient_email)
        return data
    except Exception as error:
        return error

async def send_receipt(customer_id, order_id):
    # Retrieve customer information
    response_customer = await client.customers.retrieve_customer(customer_id)
    customer = response_customer.body.get('customer', {})

    # Retrieve order information
    response_order = await client.orders.retrieve_order(order_id)
    order = response_order.body.get('order', {})

    # Generate HTML content for the receipt
    html_content = receipt_template(order)

    # Send the receipt email
    recipient_email = customer.get('email_address')
    if recipient_email:
        await send_email(
            subject="Receipt from Buzzy Sweets",
            sender_name="Paul",
            sender_email=os.getenv("EMAIL"),
            html_content=html_content,
            recipient_email=recipient_email
        )

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

# Create Order
@app.route('/create-order', methods=['POST'])
def create_order():
    try:
        order_data = request.json
        logger.debug("Received order data: %s", order_data)

        # Call the Square API to create an order
        result = client.orders.create_order(body=order_data)

        if result.is_success():
            logger.info("Order created successfully: %s", result.body)
            return jsonify({"success": True, "data": result.body}), 200
        else:
            logger.warning("Error creating order: %s", result.errors)
            return jsonify({"success": False, "errors": result.errors}), 400
    except Exception as e:
        logger.error("Error in create_order: %s", str(e))
        return jsonify({"success": False, "error": str(e)}), 500

# Process Payment
@app.route('/process-payment', methods=['POST'])
def process_payment():
    try:
        payment_data = request.json
        logger.debug("Received payment data: %s", payment_data)

        # Call the Square API to process a payment
        result = client.payments.create_payment(body=payment_data)

        if result.is_success():
            logger.info("Payment succeeded: %s", result.body)

            order_id = payment_data.get('orderId')
            customer_id = payment_data.get('customerId')  

            # Send a confirmation email
            try:
                send_transactional_email(
                    subject="Order Placed!",
                    sender_name="Paul",
                    sender_email="paultrose1@gmail.com",
                    html_content="<p>Check the Square App for the order's details.</p>",
                    recipient_email="paultrose1@gmail.com"
                )
                logger.info("Confirmation email sent.")
            except Exception as email_error:
                logger.error("Error sending confirmation email: %s", email_error)

            # Send the receipt
            try:
                send_receipt(customer_id, order_id)
                logger.info("Receipt sent successfully to customer ID: %s", customer_id)
            except Exception as receipt_error:
                logger.error("Error sending receipt: %s", receipt_error)

            logger.info("Payment processed successfully: %s", result.body)
            return jsonify({"success": True, "data": result.body}), 200
        else:
            # Handle failed payment
            logger.warning("Payment failed: %s", result.errors)
            return jsonify({
                "success": False,
                "error": "Payment failed or was not successful"
            }), 400
    except Exception as e:
        logger.error("Error in process_payment: %s", str(e))
        return jsonify({
            "success": False,
            "error": "Internal Server Error during payment process"
        }), 500
    
@app.route('/create-contact', methods=['POST'])
async def create_contact():
    try:
        contact = await request.get_json()  # Get JSON data asynchronously
        logger.debug("Contact data received: %s", contact)

        # Send email asynchronously
        response = await send_transactional_email(
            "Contact Form Submission",
            "Paul",
            "your-email@example.com",
            f"<p>Name: {contact['name']['first']} {contact['name']['last']}</p>"
            f"<p>Email: {contact['email']}</p>"
            f"<p>Message: {contact['message']}</p>",
            "your-email@example.com"
        )

        logger.info("Email sent successfully: %s", response)

        # Send success response back to the client
        return jsonify({"success": True, "message": "Email sent successfully"}), 200

    except Exception as error:
        logger.error("Error sending email: %s", error)
        # Send error response back to the client
        return jsonify({"success": False, "error": "Failed to send email"}), 500

if __name__ == "__main__":
    # Use the environment variable PORT, default to 8080 if not set
    port = int(os.getenv("PORT", 8080))
    logger.info("Starting Quart app on port %s", port)

    # Start Quart with asyncio
    asyncio.run(app.run_task(host="0.0.0.0", port=port))