import "./SavedNews.css";
import React, { useState } from "react";
import NewsCard from "../NewsCard/NewsCard.js";
import cardsList from "../../utils/cardslist.js";

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
