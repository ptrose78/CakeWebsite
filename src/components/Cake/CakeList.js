// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCakes, selectCakes, selectCakesStatus, selectCakesError } from '../../features/cake/cakeSlice';
import './Cake.css';  // Import the external CSS file

const CakeList = () => {
  const dispatch = useDispatch();
  const cakes = useSelector(selectCakes);
  const status = useSelector(selectCakesStatus);
  const error = useSelector(selectCakesError);

  const [cakesWithImages, setCakesWithImages] = useState([]);

  useEffect(() => {
    // Fetch cakes if status is idle
    if (status === 'idle') {
      dispatch(fetchCakes());
    }
    // Once cakes are fetched, load images for each cake
    const fetchImages = async () => {
      const cakesWithImageUrls = await Promise.all(
        cakes.map(async (cake) => {
          try {
            const response = await fetch(cake.url);
            if (!response.ok) throw new Error('Network response was not ok');

            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);

            return { ...cake, image: imageUrl };
          } catch (error) {
            console.error('Error fetching image:', error);
            return { ...cake, image: null }; // Handle failed image loading
          }
        })
      );
      setCakesWithImages(cakesWithImageUrls);
    };

    if (status === 'succeeded' && cakes.length > 0) {
      fetchImages();
    }
  }, [status, dispatch, cakes]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'rejected') return <p>Error: {error}</p>;
  
  
 
  return (
      <div className="cake-list">
      {cakesWithImages.map((cake) => (
        <li key={cake.id}>
          <h2>{cake.name}</h2>
          <p>Price: ${cake.price}</p>
          {cake.image ? (
            <img src={cake.image} alt={cake.name} width="200" height="200" />
          ) : (
            <p>Image not available</p>
          )}
            <button>Order Now</button>
          </li>
        ))}
      </div>
  );
};

export default CakeList;
