import "./NewsCardList.css";
import React from "react";
import NewsCard from "../NewsCard/NewsCard.js";

function NewsCardList() {
  return (
    <div className="news-card-list">
      <NewsCard />
      <NewsCard />
      <NewsCard />
    </div>
  );
}

export default NewsCardList;
