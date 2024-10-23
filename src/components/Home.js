// src/pages/Home.js
import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const cakes = useSelector((state) => state.cake.cakes);

  return (
    <div className="home-page">
      <h1>Welcome to Betty's Bakes</h1>
      <p>Delicious cakes made with love, for every occasion!</p>

      <div className="cake-list">
        {cakes.map((cake) => (
          <div key={cake.id}>
            <img src={cake.image} alt={cake.name} />
            <h3>{cake.name}</h3>
            <p>${cake.price}</p>
            <button>Order Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
