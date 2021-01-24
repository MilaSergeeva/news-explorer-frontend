/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import './NewsCard.css';
import React from 'react';
import { Route } from 'react-router-dom';

function NewsCard({ article, loggedIn, onToggleClick, isArticleSaved }) {
  const dateFormating = (dateValue) => {
    const date = new Date(dateValue);
    const year = date.toLocaleString('ru-Ru', { year: 'numeric' });
    const dateMonth = date.toLocaleString('ru-Ru', {
      day: '2-digit',
      month: 'long',
    });

    return `${dateMonth}, ${year}`;
  };

  const datePublishing = dateFormating(article.publishedAt || article.date);

  const handleSaveArticle = () => {
    if (loggedIn) {
      onToggleClick(article);
    }
  };

  const handleDeleteArticleCard = () => {
    onToggleClick(article);
  };

  return (
    <figure className="news-card">
      <a href={article.url || article.link} className="" target="_blank">
        <img
          className="news-card__img"
          src={article.urlToImage || article.image}
          alt={article.keyword}
        />
      </a>
      <div className="news-card__lables">
        <Route exact path="/">
          <button
            type="button"
            aria-label="save"
            className={`news-card__save-btn ${isArticleSaved && 'saved'}`}
            onClick={handleSaveArticle}
          />
          <p
            className="news-card__save-notification"
            style={{ display: loggedIn ? 'none' : 'inline-block' }}
          >
            Войдите, чтобы сохранять статьи
          </p>
        </Route>
        <Route exact path="/saved-news">
          <p className="news-card__search-tag">{article.keyword}</p>
          <button
            type="button"
            aria-label="delete"
            className="news-card__delete-btn"
            onClick={handleDeleteArticleCard}
          />
          <p className="news-card__delete-notification">
            Убрать из сохранённых
          </p>
        </Route>
      </div>
      <a
        href={article.url || article.link}
        className="news-card__link-to-news"
        target="_blank"
      >
        <figcaption className="news-card__inf-container">
          <time className="news-card__date">{datePublishing}</time>
          <div className="news-card__content">
            <h3 className="news-card__title">{article.title}</h3>
            <p className="news-card__text">
              {article.description || article.text}
            </p>
          </div>
          <p className="news-card__resource">
            {article.source.name || article.source}
          </p>
        </figcaption>
      </a>
    </figure>
  );
}

export default NewsCard;
