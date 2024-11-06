// src/pages/CakeOrderForm/CakeOrderForm.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    setLayerSize, 
    setFlavor, 
    setButtercreamColor, 
    setCakeMessage, 
    setNotes, 
    clearOrder, 
    selectCakeOrderForm 
} from '../../features/cakeOrderForm/cakeOrderFormSlice';
import './CakeOrderForm.css';

const CakeOrderForm = ({ product, onClose }) => {
    const dispatch = useDispatch();
    const order = useSelector(selectCakeOrderForm);
    console.log(order)

    const handleAddToCart = () => {
        console.log("Order added to cart:", order);
        dispatch(clearOrder()); // Optional: clear the form after adding to cart
    };

    const handleBuyNow = () => {
        console.log("Proceed to buy with order:", order);
    };

    return (
        <div className="cake-order-container">

            <div className={`cake-order-form ${product ? 'visible' : ''}`}>
                <button className="button-close" onClick={onClose}>✕</button>
                
                <div className="product-header">
                    {product.image ? (
                        <img src={product.image} alt={product.name} width="100" height="100" />
                    ) : (
                        <p>Image not available</p>
                    )}
                    <h2>{product?.name} Order</h2>
                </div>

                <div className="form-group">
                    <label>Layer Cake Size:</label>
                    <select onChange={(e) => dispatch(setLayerSize(e.target.value))} value={order.layerSize}>
                        <option value="">Select size</option>
                        <option value="4-inch">4" (serves 1-4)</option>
                        <option value="6-inch">6" (serves 8-10)</option>
                        <option value="8-inch">8" (serves 12-16)</option>
                        <option value="10-inch">10" (serves 18-24)</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Cake Flavor:</label>
                    <select onChange={(e) => dispatch(setFlavor(e.target.value))} value={order.flavor}>
                        <option value="">Select flavor</option>
                        <option value="chocolate">Chocolate</option>
                        <option value="vanilla">Vanilla</option>
                        <option value="red-velvet">Red Velvet</option>
                        <option value="almond">Almond</option>
                        <option value="banana">Banana</option>
                        <option value="carrot">Carrot Cake</option>
                        <option value="lemon">Lemon</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Base Buttercream Color:</label>
                    <select onChange={(e) => dispatch(setButtercreamColor(e.target.value))} value={order.buttercreamColor}>
                        <option value="">Select color</option>
                        <option value="as-pictured">As pictured</option>
                        <option value="blue">Blue</option>
                        <option value="chocolate">Chocolate</option>
                        <option value="green">Green</option>
                        <option value="grey">Grey</option>
                        <option value="orange">Orange</option>
                        <option value="pink">Pink</option>
                        <option value="purple">Purple</option>
                        <option value="tan">Tan</option>
                        <option value="white">White</option>
                        <option value="yellow">Yellow</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Add a Cake Message ($5 Fee):</label>
                    <input 
                        type="text" 
                        placeholder="Enter your message" 
                        onChange={(e) => dispatch(setCakeMessage(e.target.value))}
                        value={order.cakeMessage} 
                    />
                </div>

                <div className="form-group">
                    <label>Additional Notes:</label>
                    <textarea 
                        placeholder="Enter any special instructions" 
                        onChange={(e) => dispatch(setNotes(e.target.value))}
                        value={order.notes}
                    />
                </div>

                <div className="button-group">
                    <button onClick={handleAddToCart} className="add-to-cart">Add to Cart</button>
                    <button onClick={handleBuyNow} className="buy-now">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default CakeOrderForm;
