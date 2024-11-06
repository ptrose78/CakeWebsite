import React from 'react';
import { useLocation } from 'react-router-dom';
import Jumbotron from '../../components/Jumbotron/Jumbotron.js';

function Home() {
    const location = useLocation();
  
    return (
        <div>
            <Jumbotron />
        </div>
    )
}

export default Home;   