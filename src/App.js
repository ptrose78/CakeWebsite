import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Cakes from './pages/Cakes/Cakes.js';
import Cupcakes from './pages/Cupcakes/Cupcakes.js';
import Cookies from './pages/Cookies/Cookies.js';
import Home from './pages/Home/Home.js'
import Checkout from './pages/Checkout/Checkout.js'
import Navbar from './components/Navbar/Navbar.js'

function App() {
  const location = useLocation();

  return (
        <div className="App">
          <Navbar />
          {/* Define routes for the pages */}
          <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/cakes" element={<Cakes />} />
          <Route path="/cupcakes" element={<Cupcakes />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/checkout" element={<Checkout />} />
          </Routes>
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
