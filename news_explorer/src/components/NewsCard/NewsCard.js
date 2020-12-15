import "./NewsCard.css";
import React from "react";
import { Link, Route } from "react-router-dom";

function NewsCard() {
  const newsTitle =
    'Ученые приступили к расшифровке щелчковой "речи" кашалотов';
  const newsText =
    "Океанологи впервые обнаружили и записали то, как кашалоты общаются друг с другом, используя своеобразную ультразвуковую речь из коротких и длинных повторяющихся щелчков, похожих на азбуку Морзе, говорится в статье, опубликованной в Journal of the Acoustical Society of America.";

  const newsResource = "Лента.ру";
  return (
    <figure className="news-card">
      <img
        className="news-card__img"
        src="https://i.pinimg.com/originals/a9/b8/4b/a9b84bf853a4cda320710ad2691adcf7.jpg"
        alt="Кашалот"
      />
      <div className="news-card__lables">
        <Route exact path="/">
          <button
            type="button"
            aria-label="save"
            className="news-card__save-btn"
          />
        </Route>
        <Route exact path="/saved-news">
          <div className="news-card__search-tag">
            <p className="news-card__search-tag-text">Кашалот</p>
          </div>
          <button
            type="button"
            aria-label="delete"
            className="news-card__delete-btn"
          />
        </Route>
      </div>
      <figcaption className="news-card__context">
        <time className="news-card__date" datetime="2002-09-15">
          15 сентября, 2002
        </time>
        <h3 className="news-card__title">{newsTitle}</h3>
        <p className="news-card__text">{newsText}</p>
        <p className="news-card__resource">{newsResource.toUpperCase()}</p>
      </figcaption>
    </figure>
  );
}

export default NewsCard;
