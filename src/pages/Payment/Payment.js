// Payments.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCheckout } from "../../features/checkout/checkoutSlice";
import PaymentForm from '../../components/PaymentForm/PaymentForm.js';
import './Payment.css';

const Payment = () => {
    
    const { customerInfo, billingAddress, orderInfo } = useSelector(selectCheckout);

    return (
        <div className="payments-page">
            <header className="payments-header">
                <h1>Payment</h1>
                <p>info@bettybakes.com</p>
                <p>Returning customer? <a href="/login">Click here to login</a></p>
            </header>

            <section className="payments-details">
                <h2>Order Summary</h2>

                <table className="info-table">
                <tbody>
                    <tr>
                    <td>Email</td>
                    <td>{customerInfo.email}</td>
                    <td><a href="/checkout">Change</a></td>
                    </tr>
                    <tr>
                    <td>Billing</td>
                    <td>
                        {customerInfo.firstName} {customerInfo.lastName}, {customerInfo.address}, {customerInfo.city}, {customerInfo.state} {customerInfo.zipcode}, {customerInfo.country}
                    </td>
                    <td><a href="/checkout">Change</a></td>
                    </tr>
                    <tr>
                    <td>Pickup Info</td>
                    <td>
                        {orderInfo.deliveryMethod}, {orderInfo.pickupDate}, {orderInfo.pickupTime}
                    </td>
                    <td><a href="/checkout">Change</a></td>
                    </tr>
                </tbody>
                </table>

                <h2>Payment Information</h2>
                <PaymentForm customerInfo={customerInfo} />
            </section>
        </div>     
    );
};

export default Payment;
