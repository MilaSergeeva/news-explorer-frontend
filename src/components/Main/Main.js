import './Main.css';
import React from 'react';
import { Route } from 'react-router-dom';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import GenericNotFound from '../GenericNotFound/GenericNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SavedArticlesWithInfo from '../SavedArticlesWithInfo/SavedArticlesWithInfo';

function Main({
  loggedIn,
  savedNews,
  onSearch,
  articles,
  searchSuccess,
  preloaderIsOn,
  onToggleClick,
  isArticleSaved,
  currentUser,
}) {
  return (
    <div className="main-content">
      <Route exact path="/news-explorer-frontend">
        <SearchForm onSearch={onSearch} />
        {preloaderIsOn ? <Preloader /> : ''}
        <section className="search-result">
          {searchSuccess && (
            <NewsCardList
              loggedIn={loggedIn}
              articles={articles}
              savedNews={savedNews}
              onToggleClick={onToggleClick}
              isArticleSaved={isArticleSaved}
            />
          )}
          {searchSuccess === false && <GenericNotFound />}
        </section>
      </Route>
      <ProtectedRoute
        exact
        path="/news-explorer-frontend/saved-news"
        articles={savedNews}
        onToggleClick={onToggleClick}
        loggedIn={loggedIn}
        component={SavedArticlesWithInfo}
      />

      <Route exact path="/news-explorer-frontend">
        <section className="profile">
          <About />
        </section>
      </Route>
    </div>
  );
}

export default Main;
