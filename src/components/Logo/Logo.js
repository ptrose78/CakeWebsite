// src/pages/Logo.js
import React, { useEffect, useState } from 'react';
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
    <div>
        <img src={logoImage} alt="Betty's Bakes Logo" height='75px' widht='75px' />
    </div>
    )
};

export default Logo;