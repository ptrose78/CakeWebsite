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

const ProductList = ({category}) => {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts); //define products even though this will return an empty array
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  const [productsWithImages, setProductsWithImages] = useState([]);

  const handleCustomizeClick = (product) => {
    console.log(product)
    dispatch(showOrderForm(product));
  };

  useEffect(() => {
    const fetchData = async () => {
      // Fetch products if status is idle
      if (status === 'idle') {
        await dispatch(fetchProducts()); // Wait until fetchProducts is done
        dispatch(setCategoryFilter(category)); // Now dispatch setCategoryFilter after fetching
      }

      // Fetch images for products once products are fetched
      if (status === 'succeeded' && products.length > 0) {
        fetchImages(products);
      }
    };

    fetchData();
  }, [status, dispatch, category, products]); // products as a dependency to trigger image fetching when products are available

  //fetch Images executes after useEffect executes the first time
  const fetchImages = async (products) => {
    const productsWithImageUrls = await Promise.all(
      products.map(async (product) => {
        try {
          const response = await fetch(product.url); // Assuming each product has a 'url' field
          if (!response.ok) throw new Error('Network response was not ok');
  
          const imageBlob = await response.blob();
          const imageUrl = URL.createObjectURL(imageBlob);
  
          return { ...product, image: imageUrl };
        } catch (error) {
          console.error('Error fetching image:', error);
          return { ...product, image: null }; // Handle failed image loading
        }
      })
    );
    setProductsWithImages(productsWithImageUrls); // Set the filtered products with their images
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'rejected') return <p>Error: {error}</p>;
  
  return (
      <div className="product-list">
      {productsWithImages.map((product) => (
        <li key={product.id}>
          <h2>{product.name}</h2>
          <p>Price: ${product.price}</p>
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
