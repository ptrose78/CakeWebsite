// src/components/DropdownMenu/DropdownMenu.js
import React from 'react';
import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";
import { useSelector, useDispatch } from 'react-redux';
import { selectIsMenuOpen, openMenu, closeMenu } from '../../features/sidebar/sidebarSlice.js';
import { toggleMenu, selectMenuState } from '../../features/dropdownMenu/dropdownMenuSlice';
import './DropdownMenu.css';

const DropdownMenu = ({ className, header, img, menuId }) => {
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
                <Link className="cake-link" to={ROUTES.cakesRoute()}>Cakes</Link>
                <Link className="cupcake-link" to={ROUTES.cupcakesRoute()}>Cupcakes</Link>
                <Link className="cookie-link" to={ROUTES.cookiesRoute()}>Cookies</Link>
                </div>
            </div>
        </div>
    );
};

export default DropdownMenu;