// src/pages/CakeOrderForm/CakeOrderForm.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { v4 as uuidv4 } from 'uuid';
import { 
    setName,
    setImage, 
    setId,
    setLayerSize, 
    setFlavor, 
    setButtercreamColor,
    setAlcohol, 
    setCupcakeMessage, 
    setNotes,
    setQuantity,
    setPrice,
    clearItems, 
    selectCupcakeOrderForm, 
} from '../../features/cupcakeOrderForm/cupcakeOrderFormSlice.js';
import { addItem, selectCart, removeItem, clearCart } from  "../../features/cart/cartSlice.js"
import {  hideOrderForm, selectOrderFormVisibility } from '../../features/orderFormVisibility/orderFormVisibilitySlice.js';
import ROUTES from "../../app/routes.js";
import {Link} from "react-router-dom";
import './CupcakeOrderForm.css';


const CupcakeOrderForm = ({ product, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    
    const items = useSelector(selectCart);
    const item = useSelector(selectCupcakeOrderForm);
    const hideOrderForm = useSelector(selectOrderFormVisibility);
    console.log(items)
    
    useEffect(() => {
        dispatch(setId(uuidv4()));
        dispatch(setName(product.name));
        dispatch(setImage(product.image));
        dispatch(setPrice(product.price));
    }, [dispatch]);

    const handleAddToCart =  async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault(); // Prevent default only if `e` is an event
        }

        const form = e.target;
        if (!form.checkValidity()) {
          form.reportValidity(); // Trigger native validation
          return;
        }
        
        const action = e.nativeEvent.submitter.value; // Retrieve the button's `value`

        dispatch(setId(uuidv4()));
        dispatch(addItem({items, newItem: item})); 

        if (action === "buy") {
            navigate(ROUTES.cartRoute()); // Navigate to cart
        }

        onClose();
    };

    return (
        <div className="cupcake-order-container">

            <div className={`cupcake-order-form ${product ? 'visible' : ''}`}>
                <button className="button-close" onClick={() => { 
                    onClose(); 
                 }}>✕</button>
                
                <div className="product-header">
                    {product.image ? (
                        <img src={product.image} alt={product.name} width="100" height="100" />
                    ) : (
                        <p>Image not available</p>
                    )}
                    <h2>{product?.name} Order</h2>
                </div>

                <form id="payment-form" onSubmit={(e) => handleAddToCart(e)}>              

                <div className="form-group">
                    <label>Cupcake Flavor:</label>
                    <select required onChange={(e) => dispatch(setFlavor(e.target.value))}>
                        <option value="" disabled selected>Select flavor</option>
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
                    <select required onChange={(e) => dispatch(setButtercreamColor(e.target.value))}>
                        <option value="" disabled selected>Select color</option>
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
                    <label>Alcohol Flavor:</label>
                    <select required onChange={(e) => dispatch(setButtercreamColor(e.target.value))}>
                        <option value="" disabled selected>Select alcohol flavor</option>
                        <option value="none">None</option>
                        <option value="margarita">Margarita</option>
                        <option value="brandy-old-fashioned">Brand Old Fashioned</option>
                        <option value="pina-colata">Piña Colada</option>
                        <option value="irish-car-bomb">Irish Car Bomb</option>                        
                    </select>
                </div>


                <div className="form-group">
                    <label>Additional Notes:</label>
                    <textarea 
                        placeholder="Enter any special instructions" 
                        onChange={(e) => dispatch(setNotes(e.target.value))}
                    />
                </div>

                <div className="form-quantity">
                    <label>Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1" 
                        max="1000" 
                        step="1"
                        onChange={(e) => dispatch(setQuantity(Number(e.target.value)))}
                        required 
                    />
                </div>

                <div className="button-group">
                    <button type="submit" value="add" className="add-to-cart">Add to Cart</button>
                    <button  type="submit" value="buy" className="buy-now">Buy Now</button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default CupcakeOrderForm;
