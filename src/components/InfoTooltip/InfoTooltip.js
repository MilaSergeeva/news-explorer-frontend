import "./InfoTooltip.css";
import React from "react";

function InfoTooltip() {
  const userName = "Name";
  const savedArticlesCount = 5;

  return (
    <div className="user-info">
      <h5 className="user-info__title">Сохранённые статьи</h5>
      <h2 className="user-info__main-info">
        {userName}, у вас {savedArticlesCount} сохранённых статей
      </h2>
      <p className="user-info__additional-info">
        По ключевым словам:{" "}
        <span className="user-info__additional-info_font_bold">
          Природа, Тайга
        </span>{" "}
        и
        <span className="user-info__additional-info_font_bold">
          {" "}
          2-м другим
        </span>
      </p>
    </div>
  );
}

export default InfoTooltip;