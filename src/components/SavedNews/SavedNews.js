/* eslint-disable no-unused-vars */
import './SavedNews.css';
import React from 'react';
import NewsCard from '../NewsCard/NewsCard';

function SavedNews({ loggedIn, articles, onDeleteClick }) {
  return (
    <div className="saved-news">
      <div className="news-card-list">
        {articles.map((newsCard) => (
          <NewsCard
            key={newsCard._id}
            article={newsCard}
            loggedIn={loggedIn}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </div>
    </div>
  );
}

export default SavedNews;
