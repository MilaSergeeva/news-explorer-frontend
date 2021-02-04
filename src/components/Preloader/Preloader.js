import './Preloader.css';
import React from 'react';

function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader__icon" />
      <p className="preloader__text">Searching...</p>
    </div>
  );
}

export default Preloader;
