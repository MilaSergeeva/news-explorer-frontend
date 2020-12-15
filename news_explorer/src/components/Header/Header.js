import "./Header.css";
import headerLogo from "../../images/newsExplorer.svg";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header-bar">
        <Route path="/*">
          <Link to="/" className="header-bar__link">
            <img className="header-bar__logo" src={headerLogo} alt="Логотип" />
          </Link>
        </Route>
        <div className="header-bar__menu">
          <Route path="/*">
            <Link to="/" className="header-bar__link-to-main">
              <p>Главная</p>
            </Link>
          </Route>

          <Switch>
            <Route path="/">
              <button
                type="button"
                aria-label="Авторизация"
                className="header-bar__authtorisation"
              >
                Авторизация
              </button>
            </Route>
            <Route path="/saved-news">
              <p className="header-bar__saved-news">Сохраненные статьи</p>
              <Link to="/" className="header-bar__user-name">
                Мое Имя
              </Link>
            </Route>
          </Switch>
        </div>
      </div>
      <div className="header-search">
        <h1 className="header-search__title">Что творится в мире?</h1>
        <p className="header-search__text">
          Находите самые свежие статьи на любую тему и сохраняйте в своём личном
          кабинете.
        </p>
        <div className="header-search__input-fild">
          <input
            type="text"
            name="search"
            placeholder="Введите тему новости"
            className="header-search__input"
            minLength="2"
            maxLength="40"
            autoComplete="off"
            required
          />
          <button
            type="button"
            aria-label="Искать"
            className="header-search__search-button"
          >
            Искать
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
