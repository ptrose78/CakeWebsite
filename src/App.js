import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar.js'
import Jumbotron from './components/Jumbotron/Jumbotron.js';
import Cakes from './pages/Cakes/Cakes.js';
import Cupcakes from './pages/Cupcakes/Cupcakes.js';


function App() {
  const location = useLocation();

  return (
        <div className="App">
          <Navbar />
          
          {location.pathname !== '/cakes' && location.pathname !== '/cupcakes' && <Jumbotron />}

          {/* Define routes for the pages */}
          <Routes>
          <Route path="/cakes" element={<Cakes />} />
          <Route path="/cupcakes" element={<Cupcakes />} />
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
