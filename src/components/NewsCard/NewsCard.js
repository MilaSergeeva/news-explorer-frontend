import "./NewsCard.css";
import React from "react";
import { Link, Route } from "react-router-dom";

function NewsCard({ card, loggedIn, ...rest }) {
  const saveNewsCard = (e) => {
    loggedIn === true ? e.target.classList.toggle("saved") : " ";
  };

  return (
    <figure className="news-card">
      <img className="news-card__img" src={card.image} alt={card.tag} />
      <div className="news-card__lables">
        <Route exact path="/">
          <button
            type="button"
            aria-label="save"
            className="news-card__save-btn"
            onClick={saveNewsCard}
          />
          <p
            className="news-card__save-notification"
            style={{ display: loggedIn ? "none" : "inline-block" }}
          >
            Войдите, чтобы сохранять статьи
          </p>
        </Route>
        <Route exact path="/saved-news">
          <p className="news-card__search-tag">{card.tag}</p>
          <button
            type="button"
            aria-label="delete"
            className="news-card__delete-btn"
          />
          <p className="news-card__delete-notification">
            Убрать из сохранённых
          </p>
        </Route>
      </div>
      <figcaption className="news-card__inf-container">
        <time className="news-card__date" dateTime="2002-09-15">
          {card.date}
        </time>
        <div className="news-card__content">
          <h3 className="news-card__title">{card.title}</h3>
          <p className="news-card__text">{card.text}</p>
        </div>
        <p className="news-card__resource">{card.resource}</p>
      </figcaption>
    </figure>
  );
}

export default NewsCard;
