// src/components/DropdownMenu/DropdownMenu.js
import React from 'react';
import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";
import { useSelector, useDispatch } from 'react-redux';
import { selectIsMenuOpen, openMenu, closeMenu } from '../../features/sidebar/sidebarSlice.js';
import { toggleMenu, selectMenuState } from '../../features/dropdownMenu/dropdownMenuSlice';
import './DropdownMenu.css';

const DropdownMenu = ({ className, header, img, menuId, onClose  }) => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => selectMenuState(state, menuId));
    const isMenuOpen = useSelector(selectIsMenuOpen);

    const handleDropdownMenuToggle = () => {
        dispatch(toggleMenu(menuId));
    };

    const handleSidebarMenuToggle = () => {
        if (isMenuOpen) {
            dispatch(closeMenu())
        } else {
            dispatch(openMenu())
        }
    }

    return (
        <div className={`dropdown-container ${className}`}>
            <button className={`dropdown-menu ${className}`} onClick={handleDropdownMenuToggle}>
            {img ? <img className="baker-image" src={img}/>: ""} {header} <span className={`caret ${isOpen ? 'open' : ''}`}>▼</span>
            </button>
            <div className="drowdown-container">
                <div onClick={handleDropdownMenuToggle} className={`dropdown-content ${isOpen ? 'show' : ''}`}>
                <Link className="cake-link bg-pink-500 hover:bg-pink-600 transition flex-grow" to={ROUTES.cakesRoute()} onClick={onClose}>Cakes</Link>
                <Link className="cupcake-link bg-purple-500 hover:bg-purple-600 transition flex-grow" to={ROUTES.cupcakesRoute()} onClick={onClose}>Cupcakes</Link>      
                <Link className="cookie-link bg-yellow-500 hover:bg-yellow-600 transition flex-grow" to={ROUTES.cookiesRoute()} onClick={onClose}>Cookies</Link>

                </div>

            </div>
        </div>
    );
};

export default DropdownMenu;