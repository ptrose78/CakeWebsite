
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJumbotronImage, selectJumbotron } from '../../features/jumbotron/jumbotronSlice';
import './Jumbotron.css'; 
import DropdownMenu from '../DropdownMenu/DropdownMenu.js';
import { fetchImageFromStorage, selectImages } from '../../features/logo/logoSlice';

const Jumbotron = () => {
  const dispatch = useDispatch();
  const {images} = useSelector(selectImages);
  const { headline, subtext } = useSelector(selectJumbotron);

  useEffect(() => {
    const getData = async() => {
        if (!images) {
            await dispatch((fetchImageFromStorage()))
        }
    }
    getData();
}, [dispatch, images])

const placeholderImage = "https://source.unsplash.com/random/150x150";

    return (
        <div className="jumbotron">
          <div className="jumbotron-content" style={{ display: 'flex', alignItems: 'center' }}>
              
            <h1>{headline}</h1>
          </div>
          <p>{subtext}</p>
          <div>
            
          </div>
          <DropdownMenu className="jumbotron-menu" img={images ? images[1].image: ""} header="Shop Now" menuId="menu2" />
        </div>
      );
    };

export default Jumbotron;