import "./NewsCardList.css";
import React, { useState } from "react";
import NewsCard from "../NewsCard/NewsCard.js";

function NewsCardList({ loggedIn, cards }) {
  const [itemsToShow, setItemsToShow] = useState(3);

  const swowMoreCards = () => {
    setItemsToShow(itemsToShow + 3);
  };

  return (
    <div className="search-result-success">
      <h2 className="search-result-success__tile">Результаты поиска</h2>
      <div className="news-card-list">
        {cards.slice(0, itemsToShow).map((newsCard) => {
          return (
            <NewsCard key={newsCard._id} card={newsCard} loggedIn={loggedIn} />
          );
        })}
      </div>
      <button
        type="button"
        aria-label="Показать еще"
        className="search-result-success__button"
        onClick={swowMoreCards}
      >
        {itemsToShow >= cards.length ? "Больше карточек нет" : "Показать ещё"}
      </button>
    </div>
  );
}

export default NewsCardList;
