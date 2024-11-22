import React from "react";
import ROUTES from "../../app/routes";
import { Link } from "react-router-dom";
import "./Footer.css";
import Logo from '../Logo/Logo.js'

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-container">
          {/* Logo Section */}
          <div className="footer-logo">
            <Link to={ROUTES.homeRoute()}><Logo logoImage={0} alt="Business Logo" /></Link>
          </div>
  
          {/* Navigation Links */}
          <div className="footer-nav">
            <ul className="footer-links">
              <li><Link to={ROUTES.cakesRoute()}>Cakes</Link></li>
              <li><Link to={ROUTES.cupcakesRoute()}>Cupakes</Link></li>
              <li><Link to={ROUTES.cookiesRoute()}>Cookies</Link></li>
              <li className="about"><Link to={ROUTES.aboutRoute()}>About</Link></li>
              <li className="contactus"><Link to={ROUTES.contactUsRoute()}>Contact Us</Link></li>
            </ul>
          </div>
  
          {/* Contact Section */}
          <div className="footer-contact">
            <p>Email: <a href="mailto:buzzysweets1@gmail.com">buzzysweets1@gmail.com</a></p>
          </div>
        </div>
  
        {/* Copyright Statement */}
        <div className="footer-copyright">
          <p>Copyright © 2024 Buzzy Sweets. All Rights Reserved.</p>
        </div>
      </footer>
    );
  };
  
export default Footer;