import React from 'react';
import ProductList from '../../components/ProductList/ProductList.js'

const Cakes = () => {
    return(
        <div>   
            <h1>Cakes</h1>
            <p>Welcome to our Cakes page! Explore our delicious cake offerings here.</p>
            <ProductList category="Cake" />
        </div>
    )
}

export default Cakes;