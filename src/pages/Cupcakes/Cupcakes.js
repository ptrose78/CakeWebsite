import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductList from '../../components/ProductList/ProductList.js';
import CupcakeOrderForm from '../../components/CupcakeOrderForm/CupcakeOrderForm.js';
import { selectOrderFormVisibility, selectSelectedProduct, hideOrderForm } from '../../features/orderFormVisibility/orderFormVisibilitySlice';
import "./Cupcakes.css"

const Cupcakes = () => {
    const dispatch = useDispatch();
    const showOrderForm = useSelector(selectOrderFormVisibility);
    const selectedProduct = useSelector(selectSelectedProduct);

    return(
        <div className="cupcakes-section">   
            <h1 className="cupcakes-title">Cupcakes</h1>
            <p className="cupcakes-description">Welcome to our Cupcakes page! Explore our delicious cupcake offerings here.</p>
            <ProductList category="Cupcake" />
            {showOrderForm && (
                <CupcakeOrderForm 
                    product={selectedProduct} 
                    onClose={() => dispatch(hideOrderForm())} 
                />
            )}
        </div>
    )
}

export default Cupcakes;