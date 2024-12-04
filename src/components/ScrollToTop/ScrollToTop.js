import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {

  const location = useLocation();
  
  useEffect(() => {
    // Instantly set scroll position to top
   console.log('location:',location)
    window.scrollTo({top:0, left:0});
  }, [location]);

  return null;
};

export default ScrollToTop;
