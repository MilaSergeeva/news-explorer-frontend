import './Preloader.css';
import React from 'react';

function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader__icon" />
      <p className="preloader__text">Идет поиск новостей...</p>
    </div>
  );
}

export default Preloader;
