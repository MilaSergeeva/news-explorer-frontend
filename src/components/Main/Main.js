import './Main.css';
import React from 'react';
import { Route } from 'react-router-dom';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import GenericNotFound from '../GenericNotFound/GenericNotFound';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function Main({
  loggedIn,
  savedNews,
  onSearch,
  articles,
  searchSuccess,
  preloaderIsOn,
  onToggleClick,
  isArticleSaved,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="main-content">
      <Route exact path="/">
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
        path="/saved-news"
        articles={savedNews}
        onToggleClick={onToggleClick}
      />

      <Route exact path="/">
        <section className="profile">
          <About />
        </section>
      </Route>
    </div>
  );
}

export default Main;
