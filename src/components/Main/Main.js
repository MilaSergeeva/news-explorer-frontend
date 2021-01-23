/* eslint-disable object-curly-newline */
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

function Main({
  loggedIn,
  savedNews,
  onSearch,
  articles,
  searchSuccess,
  preloaderIsOn,
  onSaveClick,
  onDeleteClick,
  counter,
  isArticleSaved,
}) {
  return (
    <div className="main-content">
      <Route exact path="/">
        <SearchForm onSearch={onSearch} />
        {preloaderIsOn ? <Preloader /> : ''}
        {/* <Preloader /> */}
        <section className="search-result">
          {searchSuccess && (
            <NewsCardList
              loggedIn={loggedIn}
              articles={articles}
              savedNews={savedNews}
              onSaveClick={onSaveClick}
              isArticleSaved={isArticleSaved}
            />
          )}
          {searchSuccess === false && <GenericNotFound />}
        </section>
      </Route>
      <Route exact path="/saved-news">
        <UserArticlesInfo counter={counter} />
        <SavedNews articles={savedNews} onDeleteClick={onDeleteClick} />
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
