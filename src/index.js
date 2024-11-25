import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';

// Dynamically load the Square Web Payments SDK script
const loadSquareSDK = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = "https://web.squarecdn.com/v1/square.js";
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

loadSquareSDK()
  .then(() => {
    console.log('Square Web Payments SDK loaded successfully');
    // Initialize the app after SDK is loaded
    const root = ReactDOM.createRoot(document.getElementById('root')); // Only pass the container once
    root.render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  })
  .catch((error) => {
    console.error('Error loading Square SDK', error);
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();