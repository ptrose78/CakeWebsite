import React from 'react';
import ROUTES from "../../app/routes";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import Logo from '../Logo/Logo.js';
import Sidebar from '../Sidebar/Sidebar.js';
import { selectCart } from '../../features/cart/cartSlice';
import CartIcon from '../CartIcon/CartIcon.js';
import DropdownMenu from '../DropdownMenu/DropdownMenu.js';
import { disableSite, enableSite, toggleSite, selectIsSiteDisabled } from '../../features/siteDisabled/siteDisabledSlice';
import './Navbar.css';

const Navbar = () => {
  const items = useSelector(selectCart);
  const isSiteDisabled = useSelector(selectIsSiteDisabled)


  return (
      <div>{isSiteDisabled ? (
        <div className="page-container">
           
          <div className='banner'>
            We are not taking orders at the moment.
          </div>
        
          <div className="main-content">
            {/* Header Section */}
            <header className="header">
              <div className="header-left">
                <Link to={ROUTES.homeRoute()}><Logo className="logo" logoImage={0}/></Link>
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
              <Sidebar className="sidebar sidebar-site-disabled" />
            </header>
          </div>
        </div>
        ) : (    
          <header className="header">
            <div className="header-left">
              <Link to={ROUTES.homeRoute()}><Logo className="logo" logoImage={0}/></Link>
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
        )}

          {/* Navbar Section */}
          <nav className="navbar">
            <ul className="navbar-links">
              <li><DropdownMenu className="navbar-dropdownmenu" header="Our Treats" menuId="menu3" /></li>
              <li className="about"><Link to={ROUTES.aboutRoute()}>About</Link></li>
              <li><Link to={ROUTES.contactUsRoute()}>Contact Us</Link></li>
            </ul>
          </nav>
    </div>
  );
};

export default Navbar;