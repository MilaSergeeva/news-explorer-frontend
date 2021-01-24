/* eslint-disable no-unused-vars */
import './Navigation.css';
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import exitImgWhite from '../../images/exitWhite.svg';
import exitImgBlack from '../../images/exitBlack.svg';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Navigation({
  isMenuOpened,
  onAutorizationClick,
  onChangeActiveStatus,
  onCloseMenu,
  loggedIn,
  onSignOut,
  pathName,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const exitProfile = () => {
    onCloseMenu();
    onSignOut();
  };

  return (
    <div className="header-bar__menu">
      {loggedIn === false ? (
        <div
          className={`header-bar__menu-container ${
            isMenuOpened === true ? 'opened' : ''
          }`}
        >
          <NavLink
            exact
            to="/"
            activeClassName="activeMain"
            className="header-bar__nav-link color-black"
            onClick={onChangeActiveStatus}
          >
            <p>Главная</p>
          </NavLink>
          <button
            type="button"
            aria-label="Авторизация"
            className="header-bar__button"
            onClick={onAutorizationClick}
          >
            Авторизация
          </button>
        </div>
      ) : (
        <div
          className={`header-bar__menu-container ${
            isMenuOpened === true ? 'opened' : ''
          }`}
        >
          <NavLink
            exact
            to="/"
            activeClassName="activeMain"
            className="header-bar__nav-link color-black"
            onClick={onChangeActiveStatus}
          >
            <p>Главная</p>
          </NavLink>
          <NavLink
            exact
            to="/saved-news"
            activeClassName="activeSavedNews"
            className="header-bar__nav-link color-white"
            onClick={onChangeActiveStatus}
          >
            <p className="header-bar__saved-news">Сохраненные статьи</p>
          </NavLink>

          <Link
            to="/"
            className={`header-bar__button ${
              pathName === '/' ? ' ' : 'color-black'
            }`}
            onClick={exitProfile}
          >
            {currentUser.name}
            <img
              className="header-bar__exit-img"
              src={pathName === '/' ? exitImgWhite : exitImgBlack}
              alt="знак выхода"
            />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navigation;
