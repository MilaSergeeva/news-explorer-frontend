import './NewsCardList.css';
import React, { useState } from 'react';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList({ loggedIn, articles, savedNews, onToggleClick }) {
  const [itemsToShow, setItemsToShow] = useState(3);

  const swowMoreCards = () => {
    setItemsToShow(itemsToShow + 3);
  };

  const markAsSaved = (article) => {
    if (loggedIn) {
      const found = savedNews.find(
        (savedArticle) => savedArticle.title === article.title,
      );
      return !!found;
    }
  };

  React.useEffect(() => {
    setItemsToShow(3);
  }, [articles]);

  return (
    <div className="search-result-success">
      <h2 className="search-result-success__tile">Search results</h2>
      <div className="news-card-list">
        {articles.slice(0, itemsToShow).map((article) => (
          <NewsCard
            key={article.publishedAt}
            article={article}
            loggedIn={loggedIn}
            onToggleClick={onToggleClick}
            isArticleSaved={markAsSaved(article)}
          />
        ))}
      </div>
      {itemsToShow <= articles.length ? (
        <button
          type="button"
          aria-label="Показать еще"
          className="search-result-success__button"
          onClick={swowMoreCards}
        >
          Show more
        </button>
      ) : (
        ''
      )}
    </div>
  );
}

export default NewsCardList;
