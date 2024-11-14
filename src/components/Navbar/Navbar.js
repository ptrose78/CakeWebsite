import React from 'react';
import ROUTES from "../../app/routes";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import Logo from '../Logo/Logo.js';
import Sidebar from '../Sidebar/Sidebar.js';
import { selectCart } from '../../features/cart/cartSlice';
import CartIcon from '../CartIcon/CartIcon.js';
import DropdownMenu from '../DropdownMenu/DropdownMenu.js';
import './Navbar.css';

const Navbar = () => {
  const items = useSelector(selectCart);

  return (
    <>
      {/* Header Section */}
      <header className="header">
        <div className="header-left">
          <Link to={ROUTES.homeRoute()}><Logo className="logo" /></Link>
        </div>
        <div className="header-right">
          <div className="cart-container">
            <div className="cart-info">
              <div className="cart-item-count">{items.totalQuantity}</div>
              <div className="cart-total-price">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(items.totalPrice)}
              </div>
            </div>
            <Link className="cart-link" to={ROUTES.cartRoute()}><CartIcon /></Link>
          </div>
        </div>
        <Sidebar className="sidebar" />
      </header>

      {/* Navbar Section */}
      <nav className="navbar">
        <ul className="navbar-links">
          <li><DropdownMenu className="menu3" header="Our Treats" menuId="menu3" /></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contactus">Contact Us</a></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
