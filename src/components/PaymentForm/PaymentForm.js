// src/components/PaymentForm.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startPayment, paymentSuccess, paymentFailure } from '../../features/paymentForm/paymentFormSlice';
import { resetCart, selectCart } from '../../features/cart/cartSlice';
import { resetCheckout, selectCheckout } from '../../features/checkout/checkoutSlice';
import { disableSite, enableSite, toggleSite, selectIsSiteDisabled } from '../../features/siteDisabled/siteDisabledSlice';
import './PaymentForm.css'


const PaymentForm = () => {

  const dispatch = useDispatch();
 
  const appId = process.env.REACT_APP_YOUR_SQUARE_APPLICATION_ID;
  const locationId = process.env.REACT_APP_YOUR_SQUARE_LOCATION_ID;
  console.log(process.env.REACT_APP_YOUR_SQUARE_APPLICATION_ID);
  console.log(process.env.REACT_APP_YOUR_SQUARE_LOCATION_ID);

  const cart = useSelector(selectCart);
  const { customerInfo } = useSelector(selectCheckout);

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

          ////create the order
          const orderResults = await createOrder(tokenResult.token, locationId, cart);

          // if (orderResults.success === true) {
          //   setPaymentStatus('SUCCESS Ordered');
          // } else {
          //   setPaymentStatus('FAILURE Ordered');
          // }
         
          //create the payment
          
          //const verificationToken = await verifyBuyer(payments, tokenResult.token, customerInfo, 'CHARGE');

          const paymentResults = await createPayment(tokenResult.token, customerResults, orderResults);
        
          if (paymentResults.success === true) {
            console.log('success charge')
            setPaymentStatus('SUCCESS Charge');
            const clearStorage = async() => {
              await dispatch(resetCheckout());
              await dispatch(resetCart());
              dispatch(disableSite());
            }
            clearStorage();
          } else {
            console.log('failure charge')
            setPaymentStatus('FAILURE Charge');
          }

          //Optionally store the card
          if (shouldStoreCard) {
            const verificationToken = await verifyBuyer(payments, tokenResult.token, customerInfo, 'STORE');        
           
            const cardResults = await storeCard(tokenResult.token, customerResults, verificationToken);
          
            if (cardResults.success === true) {
              setPaymentStatus('SUCCESS Store');
            } else {
              setPaymentStatus('FAILURE Store');
            }
          }
        } 
     } catch (err) {
          setPaymentStatus('FAILED to process. Try Again.');
      }
  };

  const createPayment = async (token, customerResults, orderResults) => {

    const body = JSON.stringify({
      locationId,
      sourceId: token,
      idempotencyKey: window.crypto.randomUUID(),
      customerId: customerResults.customer.id,
      orderId: orderResults.order.order.id,
      amountMoney: {
        amount: cart.totalPrice,
        currency: 'USD'
      }
    })

    const response = await fetch(`${process.env.REACT_APP_API_URL_BACK}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body
    });
    console.log('payment complete')
    return response.json();
  };
 
  const verifyBuyer = async (payments, token, customerInfo, intent) => {

    const verificationDetails = {
      billingContact: {
        addressLines: [customerInfo.address, ''],
        familyName: customerInfo.lastName,
        givenName: customerInfo.firstName,
        emailAddress: customerInfo.emailAddress,
        country: customerInfo.country,
        phone: customerInfo.phone,
        region: '',
        city: customerInfo.city,
      },
      intent: intent
    };

    try {
   
      const verificationResults = await payments.verifyBuyer(token, verificationDetails);
    
  
      if (!verificationResults || !verificationResults.token) {
        throw new Error('Buyer verification failed: No token received.');
      }

     
      return verificationResults.token; // Return the verification token
    } catch (error) {
      throw new Error('Buyer verification failed.');
    }
}

  const createCustomer = async (token, customerInfo) => {
    console.log('createCustomer')
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
      emailAddress: customerInfo.emailAddress, 
      idempotency_key: window.crypto.randomUUID()
    };

  const body = JSON.stringify(bodyParameters);
  console.log(process.env.REACT_APP_API_URL_BACK)

  const response = await fetch(`${process.env.REACT_APP_API_URL_BACK}/customer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Pass token for authorization if needed
    },
    body,
  });
  console.log('customer response:', response)
  const result = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to create customer: ${result.errors[0].detail}`);
  }

  return result;
};

const createOrder = async (token, locationId, cart) => {
  console.log('start of create order')
  const lineItems = cart.items.map((item) => {
    return {
      name: item.name,
      quantity: item.quantity.toString(),
      basePriceMoney: {
        amount:  Math.round(item.price * 100),
        currency: 'USD'
      }
    };
  });
  
  const bodyParameters = {
    order: {
      locationId: locationId,
      referenceId: 'my-order-001',
      lineItems: lineItems,
    },
    idempotencyKey: window.crypto.randomUUID()
  }

  const body = JSON.stringify(bodyParameters);
  
  const orderResponse = await fetch(`${process.env.REACT_APP_API_URL_BACK}/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body,
  })

  console.log('order created:', orderResponse.ok)
  if (orderResponse.ok) {
    return orderResponse.json();
  }

  const errorBody = await orderResponse.text();
    throw new Error(errorBody);
}


const storeCard = async (token, customerResults, verificationToken) => {
 
  const bodyParameters = {
    locationId,
    sourceId: 'cnon:card-nonce-ok',
    verificationToken,
    idempotencyKey: window.crypto.randomUUID(),
    customerId: customerResults.customer.id,
  };

  const body = JSON.stringify(bodyParameters);

  const paymentResponse = await fetch(`${process.env.REACT_APP_API_URL_BACK}/card`, {
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
              I agree that I will pick up my order in person in Oak Creek, Wisconsin. I understand that Buzzy Sweets does not issue refunds for erroneously placed orders. *
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
        className={paymentStatus === 'SUCCESS Charge' ? 'is-success' : 'is-failure'}
      >
      {paymentStatus === 'SUCCESS Charge' && <p>You successfully paid. Your receipt has been emailed to you. Check your spam folder if necessary.</p>}
      {paymentStatus === 'FAILURE Charge' && <p>Sorry, your payment did not process. Review your credit card information and try again.</p>}
      </div>
    )}
  </div>
);
}



export default PaymentForm;