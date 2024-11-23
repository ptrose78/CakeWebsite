import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductList from '../../components/ProductList/ProductList.js';
import OptionsOrderForm from '../../components/OptionsOrderForm/OptionsOrderForm.js';
import { selectOrderFormVisibility, selectSelectedProduct, hideOrderForm } from '../../features/orderFormVisibility/orderFormVisibilitySlice';
import "./Cookies.css"

const Cookies = () => {
    const dispatch = useDispatch();
    const showOrderForm = useSelector(selectOrderFormVisibility);
    const selectedProduct = useSelector(selectSelectedProduct);

    return(
        <div className="cookies-section">   
            <h1 className="cookies-title">Cookies</h1>
            <p className="cookies-description">Welcome to our Cookies page! Explore our delicious cookie offerings here.</p>
            <ProductList category="Cookie" />
            {showOrderForm && (
                <OptionsOrderForm 
                    product={selectedProduct} 
                    onClose={() => dispatch(hideOrderForm())} 
                />
            )}
        </div>
    )
}

export default Cookies;