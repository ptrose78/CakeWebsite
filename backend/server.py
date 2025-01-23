from quart import Quart, request, jsonify
from quart_cors import cors
from dotenv import load_dotenv
from square.client import Client
from square.http.auth.o_auth_2 import BearerAuthCredentials
import os
import logging
import asyncio

from sib_api_v3_sdk import ApiClient, TransactionalEmailsApi
from sib_api_v3_sdk import Configuration

load_dotenv()

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

# Configure Brevo API key
api_key = os.environ.get("BREVO_API_V3_KEY")
configuration = Configuration()
configuration.api_key['api-key'] = api_key

# Create an Brevo API instance
api_instance = TransactionalEmailsApi(ApiClient(configuration))

# Environmental Variable Check
@app.route("/")
def home():
    api_key = os.environ.get("API_KEY", "No API Key Found")
    return f"API Key: {api_key}"

# Send email using Brevo API
async def send_transactional_email(subject, sender_name, sender_email, html_content, recipient_email):
    email = {
        "sender": {"name": sender_name, "email": sender_email},
        "to": [{"email": recipient_email}],  # Correct format for Sendinblue API
        "subject": subject,
        "htmlContent": html_content,
    }
    print('EMAIL content:', email)
    try:
        # Run send_transac_email in a separate thread
        response = await asyncio.to_thread(api_instance.send_transac_email, email)
        print("Email sent successfully:", response)
        return response
    except Exception as error:
        print("Error sending email:", error)
        raise error

async def send_email(subject, sender_name, sender_email, html_content, recipient_email):
    try:
        data = await send_transactional_email(subject, sender_name, sender_email, html_content, recipient_email)
        return data
    except Exception as error:
        return error

async def send_receipt(customer_id, order_id):
    # Retrieve customer information

    response_customer = await asyncio.to_thread(client.customers.retrieve_customer, customer_id)
    customer = response_customer.body.get('customer', {})

    # Retrieve order information
    response_order = await asyncio.to_thread(client.orders.retrieve_order, order_id)
    order = response_order.body.get('order', {})

    # Generate HTML content for the receipt
    html_content = await receipt_template(order)

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
async def create_customer():
    try:
          # Get the JSON body from the frontend
        customer_data = await request.json
        logger.debug("Received customer data: %s", customer_data)

        # Call the Square API to create a customer synchronously in a separate thread
        result = await asyncio.to_thread(client.customers.create_customer, body=customer_data)

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
async def create_order():
    try:
        order_data = await request.json
        logger.debug("Received order data: %s", order_data)

        # Call the Square API to create an order
        result = await asyncio.to_thread(client.orders.create_order, body=order_data)

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
async def process_payment():
    try:
        payment_data = await request.json
        logger.debug("Received payment data: %s", payment_data)

        # Call the Square API to process a payment
        result = await asyncio.to_thread(client.payments.create_payment, body=payment_data)


        if result.is_success():
            logger.info("Payment succeeded: %s", result.body)

            order_id = payment_data.get('orderId')
            customer_id = payment_data.get('customerId')  

            # Send a confirmation email
            try:
                await send_transactional_email(
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
                await send_receipt(customer_id, order_id)
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
        contact = await request.json  # Get JSON data asynchronously
        logger.debug("Contact data received: %s", contact)

        # Send email asynchronously
        response = await send_transactional_email(
            "Contact Form Submission",
            "Paul",
            "paultrose1@gmail.com",
            f"<p>Name: {contact['name']['first']} {contact['name']['last']}</p>"
            f"<p>Email: {contact['email']}</p>"
            f"<p>Message: {contact['message']}</p>",
            "paultrose1@gmail.com"
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