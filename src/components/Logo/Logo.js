// src/pages/Logo.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogoImages, selectLogoImages } from '../../features/logo/logoSlice';
import './Logo.css';  // Import the external CSS file

const Logo = ({logoImage}) => {
    const dispatch = useDispatch();
    const {logoImages} = useSelector(selectLogoImages);
 


useEffect(() => {
    const getData = async() => {
        if (!logoImages) {
            await dispatch((fetchLogoImages()))
        }
    }
    getData();
}, [dispatch, logoImages])

const placeholderImage = "https://source.unsplash.com/random/150x150";
 // Replace with your placeholder path

return (
    <img 
        className="logo" 
        src={logoImages ? logoImages[logoImage] : placeholderImage} 
        alt="Logo" 
    />)
};

export default Logo;