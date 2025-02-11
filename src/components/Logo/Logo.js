// src/pages/Logo.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImageFromStorage, selectImages } from '../../features/logo/logoSlice';
import './Logo.css';  // Import the external CSS file

const Logo = () => {
  const dispatch = useDispatch();
  const { images } = useSelector(selectImages);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const getData = async () => {
      if (!images) {
        await dispatch(fetchImageFromStorage());
      } else {
        setLoading(false); // Set loading to false once images are fetched
      }
    };
    getData();
  }, [dispatch, images]);

  const placeholderImage = "https://source.unsplash.com/random/150x150"; // Placeholder image

  return (
    <div className="logo-container">
      {loading ? (
        <div className="logo-loading">Loading...</div> // Show loading message while images are being fetched
      ) : (
        <img
          className="logo"
          src={images ? images[0].image : placeholderImage}
          alt="Logo"
        />
      )}
    </div>
  );
};

export default Logo;
