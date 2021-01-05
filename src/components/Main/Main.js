import "./Main.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import NewsCardList from "../NewsCardList/NewsCardList.js";
import About from "../About/About.js";
import SearchForm from "../SearchForm/SearchForm.js";
import InfoTooltip from "../InfoTooltip/InfoTooltip.js";

function Main() {
  return (
    <div>
      <Route exact path="/">
        <SearchForm />
      </Route>
      <Route exact path="/saved-news">
        <InfoTooltip />
      </Route>
      <section className="search-result">
        <div className="search-result-success">
          <h2 className="search-result-success__tile">Результаты поиска</h2>
          <NewsCardList />
          <button
            type="button"
            aria-label="Показать еще"
            className="search-result-success__button"
          >
            Показать ещё
          </button>
        </div>
        <div className="search-result-fail">
          <div className="search-result-fail__tile"></div>
          <div className="search-result-fail" />
        </div>
      </section>
      <Route exact path="/">
        <section className="profile">
          <About />
        </section>
      </Route>
    </div>
  );
}

export default Main;
