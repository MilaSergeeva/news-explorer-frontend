import "./NewsCard.css";
import React from "react";
import { Link, Route } from "react-router-dom";

function NewsCard({ card, ...rest }) {
  // const newsTitle =
  //   'Ученые приступили к расшифровке щелчковой "речи" кашалотов';
  // const newsText =
  //   "Океанологи впервые обнаружили и записали то, как кашалоты общаются друг с другом, используя своеобразную ультразвуковую речь из коротких и длинных повторяющихся щелчков, похожих на азбуку Морзе, говорится в статье, опубликованной в Journal of the Acoustical Society of America.";

  // const newsResource = "Лента.ру";
  return (
    <figure className="news-card">
      <img className="news-card__img" src={card.image} alt={card.tag} />
      <div className="news-card__lables">
        <Route exact path="/">
          <button
            type="button"
            aria-label="save"
            className="news-card__save-btn"
          />
          <p className="news-card__save-notification">
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
        <time className="news-card__date" datetime="2002-09-15">
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
