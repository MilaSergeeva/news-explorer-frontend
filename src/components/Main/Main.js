import "./Main.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import NewsCardList from "../NewsCardList/NewsCardList.js";
import About from "../About/About.js";
import SearchForm from "../SearchForm/SearchForm.js";
import UserArticlesInfo from "../UserArticlesInfo/UserArticlesInfo.js";
import Preloader from "../Preloader/Preloader.js";
import SavedNews from "../SavedNews/SavedNews.js";
import GenericNotFound from "../GenericNotFound/GenericNotFound.js";

function Main({ loggedIn, cards }) {
  return (
    <div className="main-content">
      <Route exact path="/">
        <SearchForm />
        <Preloader />
        <section className="search-result">
          <NewsCardList loggedIn={loggedIn} cards={cards} />
          <GenericNotFound />
        </section>
      </Route>
      <Route exact path="/saved-news">
        <UserArticlesInfo />
        <SavedNews cards={cards} />
      </Route>

      <Route exact path="/">
        <section className="profile">
          <About />
        </section>
      </Route>
    </div>
  );
}

export default Main;
