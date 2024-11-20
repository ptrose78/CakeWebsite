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
  console.log(items)

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
              <div className="cart-totals">
              {items.totalQuantity} {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(items.totalPrice)}
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
          <li className="about"><Link to={ROUTES.aboutRoute()}><a href="/about">About</a></Link></li>
          <li><Link to={ROUTES.contactUsRoute()}><a href="/contactus">Contact Us</a></Link></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
