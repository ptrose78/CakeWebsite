// src/pages/Logo.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImageFromStorage, selectImages } from '../../features/logo/logoSlice';
import './Logo.css';  // Import the external CSS file

const Logo = () => {
    const dispatch = useDispatch();
    const {images} = useSelector(selectImages);
    console.log('images', images)

useEffect(() => {
    const getData = async() => {
        if (!images) {
            await dispatch((fetchImageFromStorage()))
        }
    }
    getData();
}, [dispatch, images])

const placeholderImage = "https://source.unsplash.com/random/150x150";
 // Replace with your placeholder path

return (
    <img 
        className="logo" 
        src={images ? images[0].image: placeholderImage} 
        alt="Logo" 
    />)
};

export default Logo;