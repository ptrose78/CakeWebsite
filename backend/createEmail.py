import os
from dotenv import load_dotenv
import asyncio
from sib_api_v3_sdk import ApiClient, TransactionalEmailsApi
from sib_api_v3_sdk import Configuration
import logging

load_dotenv()

# Configure API key
api_key = os.environ.get("YOUR_API_V3_KEY")
configuration = Configuration()
configuration.api_key['api-key'] = api_key

# Create an API instance
api_instance = TransactionalEmailsApi(ApiClient(configuration))

async def send_transactional_email(subject, sender_name, sender_email, html_content, recipient_email):
    email = {
        "sender": {"name": sender_name, "email": sender_email},
        "to": [{"email": recipient_email}],  # Correct format for Sendinblue API
        "subject": subject,
        "htmlContent": html_content,
    }

    try:
        # Run send_transac_email in a separate thread
        response = await asyncio.to_thread(api_instance.send_transac_email, email)
        print("Email sent successfully:", response)
        return response
    except Exception as error:
        print("Error sending email:", error)
        raise error
