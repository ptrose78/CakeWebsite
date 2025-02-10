import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJumbotronImage, selectJumbotron } from '../../features/jumbotron/jumbotronSlice';
import { fetchImageFromStorage, selectImages } from '../../features/logo/logoSlice';
import { Link } from 'react-router-dom';

const Jumbotron = () => {
  const dispatch = useDispatch();
  const { images } = useSelector(selectImages);
  const { headline, subtext } = useSelector(selectJumbotron);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images) {
      dispatch(fetchImageFromStorage());
    }
  }, [dispatch, images]);

  const allImages = images && images.length > 0 ? images.map(img => img.image) : [
    "https://source.unsplash.com/random/800x400/?cake",
    "https://source.unsplash.com/random/800x400/?cupcake",
    "https://source.unsplash.com/random/800x400/?cookie"
  ];

  const slideshowImages = allImages.slice(2, 5);
  console.log(slideshowImages);

  useEffect(() => {
    let interval;
    if (slideshowImages.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % slideshowImages.length);
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [slideshowImages]);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + slideshowImages.length) % slideshowImages.length);
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % slideshowImages.length);
  };

  if (slideshowImages.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 w-full bg-pink-200 flex flex-col items-center justify-center text-center p-2 pt-4">
      <div className="mt-4">
        <h1 className="text-5xl font-great-vibes text-amber-800 drop-shadow-md">
          {headline}
        </h1>
        <p className="mt-2 mb-4 text-xl text-brown-600 leading-relaxed italic">
          {subtext}
        </p>
        <div className="mt-6 mb-4 w-half justify-center space-x-2 sm:space-x-4 md:space-x-8 md:hidden">
          <Link to="/cakes" className="lobster-two px-2 py-1 text-xl text-bold bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">Cakes</Link>
          <Link to="/cupcakes" className="lobster-two px-2 py-1 text-xl bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">Cupcakes</Link>
          <Link to="/cookies" className="lobster-two px-2 py-1 text-xl bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">Cookies</Link>
        </div>
      </div>

      <div className="relative bottom-2 mt-2 w-full bg-pink-200 flex flex-col items-center justify-center text-center p-6 pt-2">
      <div className="mt-2 relative w-full max-w-4xl overflow-hidden rounded-lg h-[300px]"> {/* Fixed Height */}
        {slideshowImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt="Jumbotron Slideshow"
              className="w-full h-full object-contain" 
            />
          </div>
        ))}
        </div>

        {/* Arrows */}
        <div className="absolute inset-y-0 left-0 flex items-center justify-center">
          <button onClick={goToPrevious} aria-label="Previous slide" className="p-2 bg-gray-800 bg-opacity-50 text-white rounded-r-lg hover:bg-opacity-75">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center justify-center">
          <button onClick={goToNext} aria-label="Next slide" className="p-2 bg-gray-800 bg-opacity-50 text-white rounded-l-lg hover:bg-opacity-75">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 justify-center">
          {slideshowImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-2 mx-1 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400 hover:bg-gray-500'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;