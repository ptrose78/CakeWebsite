import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductList from '../../components/ProductList/ProductList.js';
import CakeOrderForm from '../../components/CakeOrderForm/CakeOrderForm.js';
import { selectOrderFormVisibility, selectSelectedProduct, hideOrderForm } from '../../features/orderFormVisibility/orderFormVisibilitySlice';

const Cakes = () => {
    const dispatch = useDispatch();
    const showOrderForm = useSelector(selectOrderFormVisibility);
    const selectedProduct = useSelector(selectSelectedProduct);

    return(
        <div>   
            <h1>Cakes</h1>
            <p>Welcome to our Cakes page! Explore our delicious cake offerings here.</p>
            <ProductList category="Cake" />
            {showOrderForm && (
                <CakeOrderForm 
                    product={selectedProduct} 
                    onClose={() => dispatch(hideOrderForm())} 
                />
            )}
        </div>
    )
}

export default Cakes;