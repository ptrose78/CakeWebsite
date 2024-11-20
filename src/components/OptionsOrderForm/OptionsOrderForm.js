// src/pages/OptionsOrderForm/OptionsOrderForm.js
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
    setFilling,
    setAlcohol, 
    setCakeMessage, 
    setNotes,
    setQuantity,
    setPrice,
    clearItems, 
    selectOptionsOrderForm, 
} from '../../features/optionsOrderForm/optionsOrderFormSlice.js';
import { addItem, selectCart, removeItem, clearCart } from  "../../features/cart/cartSlice.js"
import {  hideOrderForm, selectOrderFormVisibility } from '../../features/orderFormVisibility/orderFormVisibilitySlice.js';
import ROUTES from "../../app/routes.js";
import {Link} from "react-router-dom";
import './OptionsOrderForm.css';


const OptionsOrderForm = ({ product, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    
    const items = useSelector(selectCart);
    const item = useSelector(selectOptionsOrderForm);
    
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
        console.log('check')
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
        <div className="options-order-container">

            <div className={`options-order-form ${product ? 'visible' : ''}`}>
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

                <form name="option-form" onSubmit={(e) => handleAddToCart(e)}> 
           
                <div className={`form-group layer-size ${product.category}`}>
                    <label>Layer {`${product.category}`} Size:</label>
                    <select name="layer-size" required={product.category === 'Cake'} onChange={(e) => dispatch(setLayerSize(e.target.value))}>
                        <option value="" selected disabled >Select size</option>
                        <option value="4-inch">4" (serves 1-4)</option>
                        <option value="6-inch">6" (serves 8-10)</option>
                        <option value="8-inch">8" (serves 12-16)</option>
                        <option value="10-inch">10" (serves 18-24)</option>
                    </select>
                </div>

                <div className={`form-group flavor ${product.category}`}>
                    <label>{`${product.category}`} Flavor:</label>
                    <select name="flavor" required={product.category === 'Cake' || product.category === 'Cupcake'} onChange={(e) => dispatch(setFlavor(e.target.value))}>
                        <option value="" selected disabled>Select flavor</option>
                        <option value="chocolate">Chocolate</option>
                        <option value="vanilla">Vanilla</option>
                        <option value="red-velvet">Red Velvet</option>
                        <option value="almond">Almond</option>
                        <option value="banana">Banana</option>
                        <option value="carrot">Carrot Cake</option>
                        <option value="lemon">Lemon</option>
                    </select>
                </div>

                <div className={`form-group buttercream ${product.category}`}>
                    <label>Base Buttercream Color:</label>
                    <select name="buttercream"  required={product.category === 'Cake'} onChange={(e) => dispatch(setButtercreamColor(e.target.value))}>
                        <option value="" selected disabled>Select color</option>
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

                <div className={`form-group filling ${product.category}`}>
                    <label>Filling:</label>
                    <select name="filling"  required={product.category === 'Cupcake'} onChange={(e) => dispatch(setFilling(e.target.value))}>
                        <option value="" selected disabled>Select filling</option>
                        <option value="none">None</option>
                        <option value="chocolate">Chocolate</option>
                        <option value="ganache">Ganache</option>
                        <option value="cookieDough">Cookie Dough</option>
                        <option value="Mousse">Mousse</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Alcohol Flavor:</label>
                    <select name="alcohol-flavor"  required={product.category === 'Cake' ||product.category === 'Cupcake' ||product.category === 'Cookie'} red onChange={(e) => dispatch(setAlcohol(e.target.value))}>
                        <option value="" selected disabled>Select alcohol flavor</option>
                        <option value="none">None</option>
                        <option value="margarita">Margarita</option>
                        <option value="brandy-old-fashioned">Brand Old Fashioned</option>
                        <option value="pina-colata">Piña Colada</option>
                        <option value="irish-car-bomb">Irish Car Bomb</option>                        
                    </select>
                </div>

                <div className={`form-group message ${product.category}`}>
                    <label>Add a Cake Message ($5 Fee):</label>
                    <input
                        type="text" 
                        placeholder="Enter your message" 
                        onChange={(e) => dispatch(setCakeMessage(e.target.value))} 
                    />
                </div>

                <div className="form-group notes">
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
                        max="100" 
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

export default OptionsOrderForm;
