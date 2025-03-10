// src/components/Sidebar/Sidebar.js
import React from 'react';
import ROUTES from "../../app/routes";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectIsMenuOpen, openMenu, closeMenu } from '../../features/sidebar/sidebarSlice.js';
import './Sidebar.css';
import DropdownMenu from '../DropdownMenu/DropdownMenu.js';

const Sidebar = () => {

    const dispatch = useDispatch();
    const isMenuOpen = useSelector(selectIsMenuOpen);

    const handleMenuToggle = () => {
        if (isMenuOpen) {
            dispatch(closeMenu())
        } else {
            dispatch(openMenu())
        }
    }

    const handleLinkClick = () => {
        dispatch(closeMenu()); // Close the menu
    };

    return (
        <div className="sidebar-container">
            <button className="menu-button" onClick={handleMenuToggle}>
                {isMenuOpen ? '✕' : '☰'}
            </button>
            
            <div  className={`sidebar-menu ${isMenuOpen ? 'open' : ''}`}>          
                    <DropdownMenu  menuId="sidebar-menu" header="Our Treats" onClose={handleLinkClick} />
                    <Link className="sidebar-link" onClick={handleMenuToggle} to={ROUTES.aboutRoute()}>About</Link>
                    <Link className="sidebar-link" onClick={handleMenuToggle} to={ROUTES.contactUsRoute()}>Contact Us</Link>
            </div>   
            
        </div>
    )
}


export default Sidebar;