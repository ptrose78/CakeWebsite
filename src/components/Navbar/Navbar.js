// src/components/Navbar/Navbar.js

import React from 'react';
import ROUTES from "../../app/routes";
import {Link} from "react-router-dom";
import Logo from '../Logo/Logo.js';
import Sidebar from '../Sidebar/Sidebar.js';
import Cart from '../Cart/Cart.js'
import './Navbar.css';


const Navbar = () => {

    return (
        <nav className='navbar'>
            <div className="navbar-left">
            <Link to={ROUTES.homeRoute()}><Logo className="logo" /></Link>
            </div>

            <div className="navbar-right">
                <Cart />
                <Sidebar />
            </div>
        </nav>
    )
}

export default Navbar;