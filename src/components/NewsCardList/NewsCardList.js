import "./NewsCardList.css";
import React, { useState } from "react";
import NewsCard from "../NewsCard/NewsCard.js";
import cardsList from "../../utils/cardslist.js";

function NewsCardList() {
  const [cards, setCards] = useState(cardsList);
  const [itemsToShow, setItemsToShow] = useState(3);

  const swowMoreCards = () => {
    setItemsToShow(itemsToShow + 3);
  };

  return (
    <div className="search-result-success">
      <h2 className="search-result-success__tile">Результаты поиска</h2>
      <div className="news-card-list">
        {cards.slice(0, itemsToShow).map((place) => {
          return <NewsCard key={place._id} card={place} />;
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
