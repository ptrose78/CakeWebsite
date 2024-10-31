import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateJumbotron, selectJumbotron } from '../../features/jumbotron/jumbotronSlice';
import './Jumbotron.css'; 

const Jumbotron = () => {
  const { headline, subtext } = useSelector(selectJumbotron);

  return (
    <div
      className="jumbotron"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '50px',
        textAlign: 'center',
        color: '#5A3E36', // warm brown for a bakery feel
      }}
    >
      <h1>{headline}</h1>
      <p>{subtext}</p>
      <button className="order-button">Shop Now</button>
    </div>
  );
};

export default Jumbotron;
