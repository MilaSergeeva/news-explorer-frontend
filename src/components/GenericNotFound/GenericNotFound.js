import './GenericNotFound.css';
import React from 'react';
import notFound from '../../images/not-found.svg';

function GenericNotFound() {
  return (
    <div className="search-result-fail">
      <img className="search-result-fail__img" src={notFound} alt="not-found" />
      <h3 className="search-result-fail__title">Ничего не найдено</h3>
      <p className="search-result-fail__paragraph">
        К сожалению по вашему запросу ничего не найдено.
      </p>
    </div>
  );
}

export default GenericNotFound;
