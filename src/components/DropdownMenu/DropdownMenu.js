// src/components/DropdownMenu/DropdownMenu.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMenu, selectMenuState } from '../../features/dropdownMenu/dropdownMenuSlice';
import './DropdownMenu.css';

const DropdownMenu = ({ className, header, menuId }) => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => selectMenuState(state, menuId));

    const handleToggle = () => {
        dispatch(toggleMenu(menuId));
    };

    return (
        <div className={`dropdown-container ${className}`}>
            <button className={`dropdown-menu ${className}`} onClick={handleToggle}>
                {header} <span className={`caret ${isOpen ? 'open' : ''}`}>▼</span>
            </button>
            <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
                <a href="/cakes">Cakes</a>
                <a href="/cupcakes">Cupcakes</a>
                <a href="/cookies">Cookies</a>
            </div>
        </div>
    );
};

export default DropdownMenu;
