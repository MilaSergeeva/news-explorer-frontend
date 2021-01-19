/* eslint-disable no-unused-vars */
import './SavedNews.css';
import React from 'react';
import NewsCard from '../NewsCard/NewsCard';

function SavedNews({ loggedIn, cards }) {
  return (
    <div className="saved-news">
      <div className="news-card-list">
        {cards.map((newsCard) => (
          <NewsCard key={newsCard._id} card={newsCard} loggedIn={loggedIn} />
        ))}
      </div>
    </div>
  );
}

export default SavedNews;
