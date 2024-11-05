// src/components/DropdownMenu/DropdownMenu.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsMenuOpen, openMenu, closeMenu } from '../../features/sidebar/sidebarSlice.js';
import './Sidebar.css';

const Sidebar = () => {

    const dispatch = useDispatch();
    const isMenuOpen = useSelector(selectIsMenuOpen);
    console.log(isMenuOpen)

    const handleMenuToggle = () => {
        if (isMenuOpen) {
            dispatch(closeMenu())
        } else {
            dispatch(openMenu())
        }
    }

    return (
        <div className="dropdown-container">
        <button className="menu-button" onClick={handleMenuToggle}>
            {isMenuOpen ? '✕' : '☰'}
        </button>
        <div className={`dropdown-menu ${isMenuOpen ? 'open' : ''}`}>
                <a href="/about">About Us</a>
                <div className="dropdown-label">Our Treats</div>
                <a href="/cakes">Cakes</a>
                <a href="/cupcakes">Cupcakes</a>
                <a href="/cookies">Cookies</a>
                <a href="/contact">Contact</a>
        </div>
    </div>
    )
}


export default Sidebar;