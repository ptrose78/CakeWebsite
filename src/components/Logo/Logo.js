// src/pages/Logo.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogoImage, selectLogoImage } from '../../features/logo/logoSlice';
import './Logo.css';  // Import the external CSS file

const Logo = () => {
    const dispatch = useDispatch();
    const {logoImage} = useSelector(selectLogoImage);


useEffect(() => {
    if (!logoImage) {
        dispatch((fetchLogoImage()))
    }
}, [dispatch])


return (
   
        <img className="logo" src={logoImage} alt="Betty's Bakes Logo" />
    
    )
};

export default Logo;