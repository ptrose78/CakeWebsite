
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJumbotronImage, selectJumbotron } from '../../features/jumbotron/jumbotronSlice';
import './Jumbotron.css'; 
import DropdownMenu from '../DropdownMenu/DropdownMenu.js';

const Jumbotron = () => {
  const dispatch = useDispatch();

  const { jumbotronImage, headline, subtext } = useSelector(selectJumbotron);
  

  useEffect(() => {
    if (!jumbotronImage) {
      dispatch(fetchJumbotronImage());
    }
  }, [dispatch]);

    return (
        <div className="jumbotron">
          <div className="jumbotron-content" style={{ display: 'flex', alignItems: 'center' }}>
              <img src={jumbotronImage} alt="Jumbotron Logo" style={{ marginRight: '2px' }} />
            <h1>{headline}</h1>
          </div>
          <p>{subtext}</p>
          <DropdownMenu className="jumbotron" header="Shop Now" menuId="menu2" />
        </div>
      );
    };

export default Jumbotron;
