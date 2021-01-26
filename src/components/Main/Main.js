/* eslint-disable no-unused-vars */
import './Main.css';
import React from 'react';
import { Route } from 'react-router-dom';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import SearchForm from '../SearchForm/SearchForm';
import UserArticlesInfo from '../UserArticlesInfo/UserArticlesInfo';
import Preloader from '../Preloader/Preloader';
import SavedNews from '../SavedNews/SavedNews';
import GenericNotFound from '../GenericNotFound/GenericNotFound';

function Main({ loggedIn, savedNewsCards, cards }) {
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
        {/* <SavedNews cards={savedNewsCards} /> */}
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
