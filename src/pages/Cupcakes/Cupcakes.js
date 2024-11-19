import React from 'react';
import ProductList from '../../components/ProductList/ProductList.js';
import "./Cupcakes.css"

const Cupcakes = () => {
    return(
        <div className="cupcakes-section">   
            <h1 className="cupcakes-title">Cupcakes</h1>
            <p className="cupcakes-description">Welcome to our Cupcakes page! Explore our delicious cupcake offerings here.</p>
            <ProductList category="Cupcake" />
        </div>
    )
}

export default Cupcakes;