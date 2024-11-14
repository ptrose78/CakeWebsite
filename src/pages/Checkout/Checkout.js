import React from 'react';
import ROUTES from "../../app/routes";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomerInfo, updateOrderInfo, toggleAccountCreation, selectCheckout } from '../../features/checkout/checkoutSlice';
import { selectCart } from '../../features/cart/cartSlice';
import './Checkout.css';

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const checkoutData = useSelector(selectCheckout);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in checkoutData.customerInfo) {
      dispatch(updateCustomerInfo({ [name]: value }));
    } else if (name in checkoutData.orderInfo) {
      dispatch(updateOrderInfo({ [name]: value }));
    }
  };

//   const handleAccountCreation = () => {
//     dispatch(toggleAccountCreation());
//   };

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>info@bettybakes.com</p>
        <p>Returning customer? <a href="/login">Click here to login</a></p>
      </div>

      <div className="checkout-content">
        {/* Customer Information Form - First Column */}
        <div className="checkout-form">
          <h2>Customer Information</h2>
          <form>
            <div className="input-container email">
              <input
                type="email"
                id="email"
                name="email"
                value={checkoutData.customerInfo.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
              <label htmlFor="email">Email *</label>
            </div>

            {/* <div className="checkbox-container">
              <input
                type="checkbox"
                id="createAccount"
                name="createAccount"
                onChange={handleAccountCreation}
              />
              <label htmlFor="createAccount">Create an account?</label>
            </div> */}

            <h3>Pickup Date and Time</h3>
            <div className="input-container">
              <input
                type="date"
                name="pickupDate"
                value={checkoutData.orderInfo.pickupDate}
                onChange={handleInputChange}
                required
              />
              <label>Select pickup date *</label>
            </div>

            <div className="input-container">
              <input
                type="time"
                name="pickupTime"
                value={checkoutData.orderInfo.pickupTime}
                onChange={handleInputChange}
                required
              />
              <label>Select pickup time *</label>
            </div>

            <h3>Billing Address</h3>
            <div className="input-container">
              <input
                type="text"
                name="firstName"
                placeholder="John"
                required
                value={checkoutData.customerInfo.firstName}
                onChange={handleInputChange}
              />
              <label>First Name *</label>
            </div>

            <div className="input-container">
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                required
                value={checkoutData.customerInfo.lastName}
                onChange={handleInputChange}
              />
              <label>Last Name *</label>
            </div>

            <div className="input-container">
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                required
                value={checkoutData.customerInfo.address}
                onChange={handleInputChange}
              />
              <label>Street Address *</label>
            </div>

            <div className="input-container">
                <input 
                type="text" 
                name="city" 
                placeholder="City" 
                required
                value={checkoutData.customerInfo.city} 
                onChange={handleInputChange} />
                <label>Town / City *</label>
            </div> 

            <div className="input-container">
                <input 
                type="text" 
                name="zipcode" 
                placeholder="zipcode" 
                required
                value={checkoutData.customerInfo.zipcode} 
                onChange={handleInputChange} />
                <label>Zip Code *</label>
            </div>

            <div className="input-container">
                <select name="state" required value={checkoutData.customerInfo.state} onChange={handleInputChange} >
                        <option value="" disabled>Select State *</option>
                                <option value="WI" selected>Wisconsin</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WY">Wyoming</option>
                            </select>
                            <label>State *</label>              
            </div>

            <div className="input-container">
                <select name="country" required value={checkoutData.customerInfo.country} onChange={handleInputChange} >
                    <option value="" disabled>Select Country *</option>
                    <option value="US">United States</option>
                </select>
                <label>Country *</label> 
            </div>

            <div className="input-container">
                <input 
                type="text" 
                name="phone" 
                placeholder="phone" 
                required
                value={checkoutData.customerInfo.phone} 
                onChange={handleInputChange} />
                <label>Phone *</label>
            </div>                     
          </form>

          <Link className="checkout-link" to={ROUTES.paymentRoute()}>
            <button className="continue-btn">Continue to Payment →</button>
          </Link>
        </div>
        {/* Order Summary Section - Second Column */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="ordered-items">
            
            {cart.items.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-name">{item.name}</div>
                <div className="item-details">
                  <p>Layer Cake Size: {item.layerSize} ({item.servingSize})</p>
                  <p>Cake Flavor: {item.flavor}</p>
                  <p>Base Buttercream Color: {item.buttercreamColor}</p>
                  {item.cakeMessage && <p>Cake Message: {item.cakeMessage}</p>}
                  {item.notes && <p>Notes: {item.notes}</p>}
                </div>
                <div className="item-total">
                  <strong>
                    Total: {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.price * item.quantity)}
                  </strong>
                </div>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="grand-total">
              <strong>
                Grand Total: {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cart.totalPrice)}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
