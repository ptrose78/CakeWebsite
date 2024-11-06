// src/components/DropdownMenu/DropdownMenu.js

import React from 'react';
import Logo from '../Logo/Logo.js';
import Sidebar from '../Sidebar/Sidebar.js';
import './Navbar.css';


const Navbar = () => {

    return (
        <nav className='navbar'>
            <div className="navbar-left">
                <Logo className="logo" />
            </div>

            <div className="navbar-right">
                <div className="cart-icon">
                    🛒
                </div>
                <Sidebar />
            </div>
        </nav>
    )
}

export default Navbar;