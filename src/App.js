import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home.js';
import Cakes from './pages/Cakes/Cakes.js';
import Cupcakes from './pages/Cupcakes/Cupcakes.js';
import Cookies from './pages/Cookies/Cookies.js';
import About from './pages/About/About.js'
import ContactUs from './pages/ContactUs/ContactUs.js'
import Cart from './pages/Cart/Cart.js';
import Checkout from './pages/Checkout/Checkout.js';
import Payment from './pages/Payment/Payment.js';
import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/Footer.js';


function App() {
  const location = useLocation();

  return (
        <div className="App">
          <div className="content">
          <Navbar />
          {/* Define routes for the pages */}
          <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/cakes" element={<Cakes />} />
          <Route path="/cupcakes" element={<Cupcakes />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path='/contactus' element={<ContactUs />} />
          <Route path='/about' element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          </Routes>
          </div>
        <Footer />
        </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
