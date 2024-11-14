// src/components/PaymentForm.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startPayment, paymentSuccess, paymentFailure } from '../../features/paymentForm/paymentFormSlice';
import { selectCart } from '../../features/cart/cartSlice';


const PaymentForm = ({customerInfo}) => {
 
  const appId = process.env.REACT_APP_YOUR_SQUARE_SANDBOX_APPLICATION_ID;
  const locationId = process.env.REACT_APP_YOUR_SQUARE_SANDBOX_LOCATION_ID;

  const cart = useSelector(selectCart);
  console.log(cart.totalPrice)

  const [card, setCard] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [shouldStoreCard, setShouldStoreCard] = useState(false);


  useEffect(() => {
    //load Square Web Payments SDK
    const loadSquare = async () => {
      if (!window.Square) {
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

  const handlePayment = async (e, cart) => {
    e.preventDefault();
    if (!card) return;
    
    try {
      
      const tokenResult = await card.tokenize();
      
        if (tokenResult.status === 'OK') {
          const payments = window.Square.payments(appId, locationId);
          
          //create the customer
          const customerResults = await createCustomer(tokenResult.token, customerInfo);
    
          //create the payment
          console.log(payments)
          //const verificationToken = await verifyBuyer(payments, tokenResult.token, customerInfo, 'CHARGE');

          const paymentResults = await createPayment(tokenResult.token, customerResults, cart);

          if (paymentResults.success === true) {
            setPaymentStatus('SUCCESS Charged');
          } else {
            setPaymentStatus('FAILURE Charged');
          }

          //Optionally store the card
          if (shouldStoreCard) {
            const verificationToken = await verifyBuyer(payments, tokenResult.token, customerInfo, 'STORE');        
            console.log(verificationToken)
            const cardResults = await storeCard(tokenResult.token, customerResults, verificationToken);
          
            if (cardResults.success === true) {
              setPaymentStatus('SUCCESS Stored');
            } else {
              setPaymentStatus('FAILURE Stored');
            }
          }
        } 
     } catch (err) {
          setPaymentStatus('FAILURE');
      }
  };

  const createPayment = async (token, customerResults, cart) => {

    console.log('start payment')
    const body = JSON.stringify({
      locationId,
      sourceId: token,
      idempotencyKey: window.crypto.randomUUID(),
      customerId: customerResults.customer.id,
      amountMoney: {
        amount: cart.totalPrice,
        currency: 'USD'
      }
    })

    console.log(body)
    
    console.log(customerResults.customer.id)
    const response = await fetch('http://localhost:3000/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId,
        sourceId: token,
        idempotencyKey: window.crypto.randomUUID(),
        customerId: customerResults.customer.id,
        amountMoney: {
          amount: cart.totalPrice,
          currency: 'USD'
        }
      }),
    });
    console.log('completed payment')
    return response.json();
  };
 
  const verifyBuyer = async (payments, token, customerInfo, intent) => {
    console.log('verifybuyer starts')
    const verificationDetails = {
      billingContact: {
        addressLines: [customerInfo.address, ''],
        familyName: customerInfo.lastName,
        givenName: customerInfo.firstName,
        email: customerInfo.email,
        country: customerInfo.country,
        phone: customerInfo.phone,
        region: '',
        city: customerInfo.city,
      },
      intent: intent
    };

    try {
      console.log('startver')
      const verificationResults = await payments.verifyBuyer(token, verificationDetails);
      console.log('verRes:', verificationResults)
  
      if (!verificationResults || !verificationResults.token) {
        throw new Error('Buyer verification failed: No token received.');
      }

      console.log(verificationResults.token)
      return verificationResults.token; // Return the verification token
    } catch (error) {
      throw new Error('Buyer verification failed.');
    }
}

  const createCustomer = async (token, customerInfo) => {
    const bodyParameters = {
      address: {
        address: customerInfo.address,
        country: customerInfo.country,
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        zipCode: customerInfo.zipcode
      },
      givenName: customerInfo.firstName,  
      familyName: customerInfo.lastName,  
      emailAddress: customerInfo.email, 
      idempotency_key: window.crypto.randomUUID()
    };

  const body = JSON.stringify(bodyParameters);

  const response = await fetch('http://localhost:3000/customer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Pass token for authorization if needed
    },
    body,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to create customer: ${result.errors[0].detail}`);
  }

  return result;
};


 const storeCard = async (token, customerResults, verificationToken) => {
 
  const bodyParameters = {
    locationId,
    sourceId: 'cnon:card-nonce-ok',
    verificationToken,
    idempotencyKey: window.crypto.randomUUID(),
    customerId: customerResults.customer.id,
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
    <form id="payment-form" onSubmit={(e) => handlePayment(e, cart)}>
      <div id="card-container"></div>
      <p>All transactions are secure and encrypted.</p>
                
        <section className="terms-conditions">
          <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree that I will pick up my order in person in Oak Creek, Wisconsin. I understand that Betty's Bakes does not issue refunds for erroneously placed orders. *
            </label>
        </section>
                
        <button id="card-button" type="submit" className="place-order-btn">Place Order Now</button>
        
      <div>
        {/* <label>
          <input
            type="checkbox"
            id="store-card-checkbox"
            onChange={(e) => setShouldStoreCard(e.target.checked)}
          />
          Save this card for future use
        </label> */}
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