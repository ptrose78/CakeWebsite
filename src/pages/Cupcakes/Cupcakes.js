import React from 'react';
import ProductList from '../../components/ProductList/ProductList.js'

const Cupcakes = () => {
    return(
        <div>   
            <h1>Cupcakes</h1>
            <p>Welcome to our Cupcakes page! Explore our delicious cupcake offerings here.</p>
            <ProductList category="Cupcake" />
        </div>
    )
}

export default Cupcakes;