import React from "react";
import "./Footer.css";
import Logo from '../Logo/Logo.js'

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-container">
          {/* Logo Section */}
          <div className="footer-logo">
            <Logo logoImage={0} alt="Business Logo" />
          </div>
  
          {/* Navigation Links */}
          <div className="footer-nav">
            <ul className="footer-links">
              <li><a href="/cakes">Cakes</a></li>
              <li><a href="/cupcakes">Cupcakes</a></li>
              <li><a href="/cookies">Cookies</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contactus">Contact Us</a></li>
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