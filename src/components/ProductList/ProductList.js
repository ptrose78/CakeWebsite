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
  const products = useSelector(selectFilteredProducts);

  // Local state
  const [productsWithImages, setProductsWithImages] = useState([]);
  const [hasFetchedImages, setHasFetchedImages] = useState(false);

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
      if (status === 'succeeded' && products.length > 0) {
        console.log(products)
        const productsWithImagesData = await fetchImages(products);
        console.log(productsWithImagesData)
        setProductsWithImages(productsWithImagesData);
      }
    };

    fetchImagesForProducts();
  }, [products, status]);

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
      // Map product fetches and resolve them using Promise.all
      const productsWithImages = await Promise.all(
        products.map(async (product) => {
          try {
            const response = await fetch(product.url); // Assuming 'url' exists on each product object
            if (!response.ok) throw new Error('Network response was not ok');
  
            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
  
            return { ...product, image: imageUrl }; // Add the resolved image URL to the product object
          } catch (error) {
            console.error('Error fetching image:', error);
            return { ...product, image: null }; // Handle failed image fetching
          }
        })
      );
      return productsWithImages; // Return the fully resolved product array
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
