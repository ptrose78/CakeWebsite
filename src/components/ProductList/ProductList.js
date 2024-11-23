// src/pages/ProductList.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProductsStatus, selectProductsError } from '../../features/productList/productListSlice';
import {
  fetchProducts,
  setCategoryFilter,
  setPriceFilter,
  setTypeFilter,
  selectFilteredProducts,
} from '../../features/productList/productListSlice';
import { showOrderForm } from '../../features/orderFormVisibility/orderFormVisibilitySlice';
import './ProductList.css';  // Import the external CSS file

const ProductList = ({ category }) => {
  const dispatch = useDispatch();

  // Redux state
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  const products = useSelector(selectFilteredProducts); //provides global access to products from its productListSlice.js

  // Local state
  const [productsWithImages, setProductsWithImages] = useState([]); //productsWithImages is used locally
  const [hasFetchedImages, setHasFetchedImages] = useState(false); //hasFetchedImages is used locally

  useEffect(() => {
    const fetchData = async () => {
      if (status === 'idle') {
        await dispatch(fetchProducts());
      }
      if (status === 'succeeded') {
        dispatch(setCategoryFilter(category));
      }
    };

    fetchData();
  }, [dispatch, status, category]);

 
  useEffect(() => {
    const fetchImagesForProducts = async () => {
      if (status === 'succeeded' && products.length > 0 && !hasFetchedImages) {
        setHasFetchedImages(true); // Ensure this only runs once for this set of products
  
        const productsWithImagesData = await fetchImages(products); 
        setProductsWithImages(productsWithImagesData);
      }
    };
  
    fetchImagesForProducts();
  }, [products, status, hasFetchedImages]);


  const fetchImages = async (products) => {
    try {
      // Return products as is if the URL is valid
      const productsWithImages = products.map((product) => {
        if (product.url) {
          return { ...product, image: product.url }; // Use the existing URL directly
        } else {
          return { ...product, image: null }; // Handle missing URLs gracefully
        }
      });
      return productsWithImages;
    } catch (error) {
      console.error('Error in fetchImages:', error);
      return []; // Handle a global failure gracefully
    }
  };
   
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
      <div className="product-list">
      {productsWithImages.map((product) => (
        <li key={product.id}>
          <h2>{product.name}</h2>
          <p>Price: ${product.price} {checkCookie(product) && "per dozen"}</p>
          {product.image ? (
            <img src={product.image} alt={product.name} width="200" height="200" />
          ) : (
            <p>Image not available</p>
          )}
            <button onClick={() => handleCustomizeClick(product)}>Order</button>
        </li>
        ))}
      </div>
  );
};

export default ProductList;
