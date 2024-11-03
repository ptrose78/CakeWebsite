
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateJumbotron, selectJumbotron } from '../../features/jumbotron/jumbotronSlice';
import { fetchLogoImage, selectLogoImage, selectLogoStatus} from '../../features/logo/logoSlice';
import './Jumbotron.css'; 

const Jumbotron = () => {
  const dispatch = useDispatch();

  const { headline, subtext } = useSelector(selectJumbotron);
  const { logoImage } = useSelector(selectLogoImage) || {};

  useEffect(() => {
    if (!logoImage) {
      dispatch(fetchLogoImage());
    }
  }, [dispatch]);

    return (
        <div className="jumbotron">
          <div className="jumbotron-content" style={{ display: 'flex', alignItems: 'center' }}>
            {logoImage ? (
              <img src={logoImage} alt="Betty's Bakes Logo" style={{ marginRight: '2px' }} />
            ) : (
              <p>Loading logo...</p>
            )}
            <h1>{headline}</h1>
          </div>
          <p>{subtext}</p>
          <button className="order-button">Shop Now</button>
        </div>
      );
    };

export default Jumbotron;
