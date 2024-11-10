// src/components/Navbar/Navbar.js

import React from 'react';
import ROUTES from "../../app/routes";
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import Logo from '../Logo/Logo.js';
import Sidebar from '../Sidebar/Sidebar.js';
import { selectCart } from '../../features/cart/cartSlice';
import Cart from '../Cart/Cart.js'
import './Navbar.css';


const Navbar = () => {

    const orders = useSelector(selectCart);

    return (
        <nav className='navbar'>
            <div className="navbar-left">
            <Link to={ROUTES.homeRoute()}><Logo className="logo" /></Link>
            </div>

            <div className="navbar-right">
                <div className="cart-container">
                    <div className="cart-info">
                        <div className="cart-item-count">{orders.totalQuantity}</div>
                        <div className="cart-total-price">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(orders.totalPrice)}
                        </div>
                    </div>
                    <Link className="cart-link" to={ROUTES.checkoutRoute()}><Cart /></Link>
                </div>
            <Sidebar />
            </div>
        </nav>
    )
}

export default Navbar;