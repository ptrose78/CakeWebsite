const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.YOUR_API_V3_KEY;


const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

async function send_transactional_email(subject, senderName, senderEmail, htmlContent, recipientEmail) {
    const email = {
        sender: { name: senderName, email: senderEmail },
        to: [{ email: recipientEmail }], // Correct format
        subject: subject,
        htmlContent: htmlContent,
    };

    try {
        const response = await apiInstance.sendTransacEmail(email);
        console.log("Email sent successfully:", response);
        return response;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}

module.exports = { send_transactional_email };
