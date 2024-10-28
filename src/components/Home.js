// src/pages/Home.js
import React from 'react';
import { useSelector } from 'react-redux';
import './Home.css';  // Import the external CSS file

const Home = () => {
  const cakes = useSelector((state) => state.cake.cakes);

  fetch('/cms/wp-content/uploads/2024/10/BettyBakes01.png')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.blob(); // Fetch the image as a binary blob
  })
  .then(imageBlob => {
    // Create a local URL for the image blob
    const imageUrl = URL.createObjectURL(imageBlob);

    // Check if an image already exists and update its source
    let img = document.getElementById('fetched-image');
    if (!img) {
      // If image element doesn't exist, create it
      img = document.createElement('img');
      img.id = 'fetched-image';
      document.body.appendChild(img); // Append to the document
    }
    img.src = imageUrl; // Set the image source to the blob URL
  })
  .catch(error => {
    console.error('Error fetching the image:', error);
  });

 
console.log('hi')
  
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
