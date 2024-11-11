import React from 'react';
import PaymentForm from '../../components/PaymentForm/PaymentForm.js';
import { selectCart, removeItem, updateQuantity } from '../../features/cart/cartSlice.js';
import './Payment.css'

function Payment() {
  
    return (
        <div>
            <PaymentForm />
        </div>
    )
}

export default Payment;   