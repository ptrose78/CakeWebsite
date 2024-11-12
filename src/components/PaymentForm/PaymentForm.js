// src/components/PaymentForm.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startPayment, paymentSuccess, paymentFailure } from '../../features/paymentForm/paymentFormSlice';

const PaymentForm = () => {
 
  const appId = process.env.REACT_APP_YOUR_SQUARE_SANDBOX_APPLICATION_ID;
  const locationId = process.env.REACT_APP_YOUR_SQUARE_SANDBOX_LOCATION_ID;

  const [card, setCard] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [shouldStoreCard, setShouldStoreCard] = useState(false);


  useEffect(() => {
    //load Square Web Payments SDK
    const loadSquare = async () => {
      if (!window.Square) {
        console.error('Square.js failed to load');
        return;
      }

      //initialize payments
      const payments = window.Square.payments(appId, locationId);

      if (!payments) {
        return;
      }

      try {
        const card = await payments.card();
        await card.attach('#card-container'); // Attach to React-rendered div
        setCard(card);
      } catch (err) {
      }
    };

    loadSquare();
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!card) return;

    try {
      //create the payment
      const tokenResult = await card.tokenize();
      if (tokenResult.status === 'OK') {
        await createPayment(tokenResult.token);
        setPaymentStatus('SUCCESS');
      } else {
        setPaymentStatus('FAILURE');
      }

      //Optionally store the card
      if (shouldStoreCard) {
        const payments = window.Square.payments(appId, locationId);
        const verificationToken = await verifyBuyer(payments, tokenResult.token);
        const cardResults = await storeCard(tokenResult.token, verificationToken);
      }
      } catch (err) {
        setPaymentStatus('FAILURE');
      }
  };

  const createPayment = async (token) => {
    const response = await fetch('http://localhost:3000/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId,
        sourceId: token,
        idempotencyKey: window.crypto.randomUUID(),
      }),
    });
    return response.json();
  };
 
  const verifyBuyer = async (payments, token) => {

    const verificationDetails = {
      billingContact: {
        addressLines: ['123 Main Street', 'Apartment 1'],
        familyName: 'Doe',
        givenName: 'John',
        email: 'jondoe@gmail.com',
        country: 'GB',
        phone: '3214563987',
        region: 'LND',
        city: 'London',
      },
      intent: 'STORE',
    };

    const verificationResults = await payments.verifyBuyer(
      token,
      verificationDetails
    );

    if (verificationResults.status !== 'OK') {
      throw new Error('Buyer verification failed');
    }

  return verificationResults.token;
}

 const storeCard = async (token, verificationToken) => {
  const bodyParameters = {
    locationId,
    sourceId: token,
    verificationToken,
  };

  const body = JSON.stringify(bodyParameters);

  const paymentResponse = await fetch('http://localhost:3000/card', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  if (paymentResponse.ok) {
    return paymentResponse.json();
  }

  const errorBody = await paymentResponse.text();
  throw new Error(errorBody);
}

return (
  <div>
    <form id="payment-form" onSubmit={handlePayment}>
      <div id="card-container"></div>
      <p>All transactions are secure and encrypted.</p>
                
        <section className="terms-conditions">
          <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree that I will pick up my order in person in Oak Creek, Wisconsin. I understand that Betty Bakes does not issue refunds for erroneously placed orders. *
            </label>
        </section>
                
        <button id="card-button" type="submit" className="place-order-btn">Place Order Now</button>
        
      <div>
        <label>
          <input
            type="checkbox"
            id="store-card-checkbox"
            onChange={(e) => setShouldStoreCard(e.target.checked)}
          />
          Save this card for future use
        </label>
      </div>
    </form>
    {paymentStatus && (
      <div
        id="payment-status-container"
        className={paymentStatus === 'SUCCESS' ? 'is-success' : 'is-failure'}
      >
        Payment {paymentStatus}
      </div>
    )}
  </div>
);
}



export default PaymentForm;