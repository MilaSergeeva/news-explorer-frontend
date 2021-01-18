import "./SavedNews.css";
import React from "react";
import NewsCard from "../NewsCard/NewsCard.js";

function SavedNews({ loggedIn, cards }) {
  return (
    <div className="saved-news">
      <div className="news-card-list">
        {cards.map((newsCard) => {
          return (
            <NewsCard key={newsCard._id} card={newsCard} loggedIn={loggedIn} />
          );
        })}
      </div>
    </div>
  );
}

export default SavedNews;
