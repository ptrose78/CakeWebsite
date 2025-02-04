// src/pages/ProductList.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaFilter } from 'react-icons/fa'; 
import { selectProductsStatus, selectProductsError } from '../../features/productList/productListSlice';
import {
  fetchProducts,
  setCategoryFilter,
  setPriceFilter,
  setTypeFilter,
  sortPriceFilter,
  selectFilteredProducts,
} from '../../features/productList/productListSlice';
import { showOrderForm } from '../../features/orderFormVisibility/orderFormVisibilitySlice';
import { disableSite, enableSite, toggleSite, selectIsSiteDisabled } from '../../features/siteDisabled/siteDisabledSlice';

import './ProductList.css';  // Import the external CSS file

const ProductList = ({ category }) => {
  const dispatch = useDispatch();

  // Redux state
  const isSiteDisabled = useSelector(selectIsSiteDisabled);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  const products = useSelector(selectFilteredProducts); //provides global access to products from its productListSlice.js

  // Local state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (status === 'idle') {
        await dispatch(fetchProducts());
      }
      if (status === 'succeeded') {
        await dispatch(setCategoryFilter(category));
        await dispatch(sortPriceFilter('highToLow'));
      }
    };

    fetchData();
  }, [dispatch, status, category]);

 
  // useEffect(() => {
  //   const fetchImagesForProducts = async () => {
  //     if (status === 'succeeded' && products.length > 0 && !hasFetchedImages) {
  //       setHasFetchedImages(true); // Ensure this only runs once for this set of products
  
  //       const productsWithImagesData = await fetchImages(products); 
  //       setProductsWithImages(productsWithImagesData);
  //     }
  //   };
  
  //   fetchImagesForProducts();
  // }, [products, status, hasFetchedImages]);


  // const fetchImages = async (products) => {
  //   try {
  //     // Return products as is if the URL is valid
  //     const productsWithImages = products.map((product) => {
  //       if (product.url) {
  //         return { ...product, image: product.url }; // Use the existing URL directly
  //       } else {
  //         return { ...product, image: null }; // Handle missing URLs gracefully
  //       }
  //     });
  //     return productsWithImages;
  //   } catch (error) {
  //     console.error('Error in fetchImages:', error);
  //     return []; // Handle a global failure gracefully
  //   }
  // };

  const handleSortPrice = (order) => {
    const sortPrice = async () => {
      if (order === 'lowToHigh') {
        await dispatch(sortPriceFilter('lowToHigh'))
      }
       else if (order === 'highToLow') {
        await dispatch(sortPriceFilter('highToLow'))
      }
      return 0;
    }
    sortPrice();
  }
  
   
  const handleCustomizeClick = (product) => {
    dispatch(showOrderForm(product));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  function checkCookie(product) {
    return product.category === "Cookie"; 
  }
  
  return (
        
      <div className="product-container">
          <div className="filter-container">
            <button
              className="filter-icon"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Filter options"
            >
              <FaFilter size={24} />
            </button>

            {isMenuOpen && (
              <div className="filter-menu">
                <button onClick={() => handleSortPrice('lowToHigh')}>Low-to-High</button>
                <button onClick={() => handleSortPrice('highToLow')}>High-to-Low</button>
              </div>
            )}
          </div>
          <div className="product-list">
            {products.map((product) => (
              <li key={product.id}>
                <h2 className="mb-1">{product.name}</h2>
                <p className="mb-1">Price: ${product.price} {checkCookie(product) && "per dozen"}</p>
                {product.image ? (
                  <img src={product.image} alt={product.name} width="200" height="200" />
                ) : (
                  <p>Image not available</p>
                )}
                  <button disabled={isSiteDisabled} onClick={() => handleCustomizeClick(product)}>Order</button>
              </li>
              ))}
          </div>
    </div>
  );
};

export default ProductList;
