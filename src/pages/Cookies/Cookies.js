import React from 'react';
import ProductList from '../../components/ProductList/ProductList.js'

const Cookies = () => {
    return(
        <div>   
            <h1>Cookies</h1>
            <p>Welcome to our Cookies page! Explore our delicious cookie offerings here.</p>
            <ProductList category="Cookie" />
        </div>
    )
}

export default Cookies;