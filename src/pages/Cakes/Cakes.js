import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductList from '../../components/ProductList/ProductList.js';
import OptionsOrderForm from '../../components/OptionsOrderForm/OptionsOrderForm.js';
import { selectOrderFormVisibility, selectSelectedProduct, hideOrderForm } from '../../features/orderFormVisibility/orderFormVisibilitySlice';
import "./Cakes.css"

const Cakes = () => {
    const dispatch = useDispatch();
    const showOrderForm = useSelector(selectOrderFormVisibility);
    const selectedProduct = useSelector(selectSelectedProduct);

    return(
        <div className="cakes-section">   
            <h1 className="cakes-title">Cakes</h1>
            <p className="cakes-description">Welcome to our Cakes page! Explore our delicious cake offerings here.</p>
            <ProductList category="Cake" />
            {showOrderForm && (
                <OptionsOrderForm 
                    product={selectedProduct} 
                    onClose={() => dispatch(hideOrderForm())} 
                />
            )}
        </div>
    )
}

export default Cakes;