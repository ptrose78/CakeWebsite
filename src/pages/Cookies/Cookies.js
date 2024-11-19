import React from 'react';
import ProductList from '../../components/ProductList/ProductList.js'
import "./Cookies.css"

const Cookies = () => {
    return(
        <div className="cookies-section">   
            <h1 className="cookies-title">Cookies</h1>
            <p className="cookies-description">Welcome to our Cookies page! Explore our delicious cookie offerings here.</p>
            <ProductList category="Cookie" />
        </div>
    )
}

export default Cookies;