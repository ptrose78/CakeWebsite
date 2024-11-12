import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ROUTES from "../../app/routes";
import {Link} from "react-router-dom";
import { selectCart, removeItem, updateQuantity } from '../../features/cart/cartSlice';
import './Cart.css'

const Cart = () => {
  const cart = useSelector(selectCart); // Get items from Redux state
  const items = cart.items;

  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeItem(id)); // Dispatch remove item 
  };

  const handleQuantityChange = (id, value) => {
    dispatch(updateQuantity({ itemId: id, newQuantity: value })); // Dispatch quantity update action
  };

  return (
    <div className="item-summary">
      <h2>Cart Summary</h2>
      <div className="cart-items">
        {/* Headings for each column */}
        <div className="cart-header">
          <div className="cart-column product">Product</div>
          <div className="cart-column details">Details</div>
          <div className="cart-column price">Price</div>
          <div className="cart-column quantity">Quantity</div>
          <div className="cart-column subtotal">Subtotal</div>
        </div>

        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <button onClick={() => handleRemove(item.id)} className="remove-btn">x</button>
            {/* First Column: Product (Image + Name) */}
            <div className="cart-column product">
            <div className="product-image">
                {item.image ? (
                  <img src={item.image} alt={item.name} width="100" height="100" />
                ) : (
                  <p>Image not available</p>
                )}
            </div>
              
            <div className="product-name">{item.name}</div>
          </div>

            {/* Second Column: Details */}
            <div className="cart-column details">
              <p><span className="label-detail">Layer Size:</span> {item.layerSize}</p>
              <p><span className="label-detail">Flavor:</span> {item.flavor}</p>
              <p><span className="label-detail">Buttercream Color:</span> {item.buttercreamColor}</p>
              {item.cakeMessage && <p><span className="label-detail">Cake Message:</span> {item.cakeMessage}</p>}
              {item.notes && <p><span className="label-detail">Notes:</span> {item.notes}</p>}
            </div>

            {/* Third Column: Price */}
            <div className="cart-column price">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(item.price)}
            </div>

            {/* Fourth Column: Quantity */}
            <div className="cart-column quantity">
            <button onClick={() => handleQuantityChange(item.id, item.quantity-1)} className="quantity-btn">-</button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                min="1"
                className="quantity-input"
              />
              <button onClick={() => handleQuantityChange(item.id, item.quantity+1)} className="quantity-btn">+</button>
            </div>

            {/* Fifth Column: Subtotal */}
            <div className="cart-column subtotal">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>
       {/* Total Price Section */}
      <div className="cart-summary">
        <div className="total-price">
          Total Price:{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(cart.totalPrice)} {/* totalPrice is the sum of all items */}
        </div>
        <Link className="checkout-link" to={ROUTES.checkoutRoute()}>
          <button className="proceed-button" >
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
);
}


export default Cart;
