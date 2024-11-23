// Payments.jsx
import React from "react";
import ROUTES from "../../app/routes";
import {Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCheckout } from "../../features/checkout/checkoutSlice";
import PaymentForm from '../../components/PaymentForm/PaymentForm.js';
import './Payment.css';

const Payment = () => {
    
    const { customerInfo, orderInfo } = useSelector(selectCheckout);

    return (
        <div className="payments-page">
            <header className="payments-header">
                <h1>Payment</h1>
            </header>

            <section className="payments-details">
                <h2>Order Summary</h2>

                <table className="info-table">
                <tbody>
                    <tr>
                    <td>Email</td>
                    <td>{customerInfo.emailAddress}</td>
                    <td><Link className="checkout-link" to={ROUTES.checkoutRoute()}>Change</Link></td>
                    </tr>
                    <tr>
                    <td>Billing</td>
                    <td>
                        {customerInfo.firstName} {customerInfo.lastName}, {customerInfo.address}, {customerInfo.city}, {customerInfo.state} {customerInfo.zipcode}, {customerInfo.country}
                    </td>
                    <td><Link className="checkout-link" to={ROUTES.checkoutRoute()}>Change</Link></td>
                    </tr>
                    <tr>
                    <td>Pickup Info</td>
                    <td>
                        {orderInfo.deliveryMethod}, {orderInfo.pickupDate}, {orderInfo.pickupTime}
                    </td>
                    <td><Link className="checkout-link" to={ROUTES.checkoutRoute()}>Change</Link></td>
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
