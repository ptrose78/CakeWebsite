import React from 'react';
import ROUTES from "../../app/routes";
import { useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from "react-redux";
import { updateCustomerInfo, updateOrderInfo, toggleAccountCreation, selectCheckout } from '../../features/checkout/checkoutSlice';
import { selectCart } from '../../features/cart/cartSlice';
import './Checkout.css';

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const navigate = useNavigate();
  
  const { customerInfo, orderInfo } = useSelector(selectCheckout);
  console.log('customerInfo from Checkout', customerInfo)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in customerInfo) {
      dispatch(updateCustomerInfo({ [name]: value }));
    } else if (name in orderInfo) {
      dispatch(updateOrderInfo({ [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity(); // Trigger native validation
      return;
    }

    // Navigate to payment route after validation passes
    navigate(ROUTES.paymentRoute());
  };

//   const handleAccountCreation = () => {
//     dispatch(toggleAccountCreation());
//   };

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>
      </div>

      <div className="checkout-content">
        {/* Customer Information Form - First Column */}
        <div className="checkout-form">
          <h3>Customer Information</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-container email">
              <input
                type="email"
                id="email"
                name="emailAddress"
                value={customerInfo.emailAddress}
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
                value={orderInfo.pickupDate}
                onChange={handleInputChange}
                required
              />
              <label>Select pickup date *</label>
            </div>

            <div className="input-container">
              <input
                type="time"
                name="pickupTime"
                value={orderInfo.pickupTime}
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
                value={customerInfo.firstName}
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
                value={customerInfo.lastName}
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
                value={customerInfo.address}
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
                value={customerInfo.city} 
                onChange={handleInputChange} />
                <label>Town / City *</label>
            </div> 

            <div className="input-container">
                <input 
                type="text" 
                name="zipcode" 
                placeholder="zipcode" 
                required
                value={customerInfo.zipcode} 
                onChange={handleInputChange} />
                <label>Zip Code *</label>
            </div>

            <div className="input-container">
                <select name="state" required value={customerInfo.state} onChange={handleInputChange} >
                        <option value="" disabled>Select State *</option>
                                <option value="WI">Wisconsin</option>
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
                <select name="country" required value={customerInfo.country} onChange={handleInputChange} >
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
                value={customerInfo.phone} 
                onChange={handleInputChange} />
                <label>Phone *</label>
            </div>    
              <button type="submit" className="checkout-link continue-btn">Continue to Payment →</button>
          </form>
        </div>
        {/* Order Summary Section - Second Column */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="ordered-items">
            
            {cart.items.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-name">{item.name}</div>
                <div className="item-details">
                {item.layerSize && <p><span className="label-detail">Layer Size:</span> {item.layerSize}</p>}
              {item.flavor && <p><span className="label-detail">Flavor:</span> {item.flavor}</p>}
              {item.buttercreamColor && <p><span className="label-detail">Buttercream Color:</span> {item.buttercreamColor}</p>}
              {item.filling && <p><span className="label-detail">Filling:</span> {item.filling}</p>}
              <p><span className="label-detail">Alcohol Flavor:</span> {item.alcohol}</p>
              {item.cakeMessage && <p><span className="label-detail">Cake Message:</span> {item.cakeMessage}</p>}
              {item.notes && <p><span className="label-detail">Notes:</span> {item.notes}</p>}
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
