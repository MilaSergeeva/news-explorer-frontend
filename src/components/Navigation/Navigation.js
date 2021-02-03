import './Navigation.css';
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import exitImgWhite from '../../images/exitWhite.svg';
import exitImgBlack from '../../images/exitBlack.svg';

function Navigation({
  isMenuOpened,
  onAutorizationClick,
  onChangeActiveStatus,
  onCloseMenu,
  loggedIn,
  onSignOut,
  pathName,
  currentUser,
}) {
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
            to="/news-explorer-frontend/"
            activeClassName="activeMain"
            className="header-bar__nav-link color-black"
            onClick={onChangeActiveStatus}
          >
            <p>Main</p>
          </NavLink>
          <button
            type="button"
            aria-label="Авторизация"
            className="header-bar__button"
            onClick={onAutorizationClick}
          >
            Register
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
            to="/news-explorer-frontend/"
            activeClassName="activeMain"
            className="header-bar__nav-link color-black"
            onClick={onChangeActiveStatus}
          >
            <p>Main</p>
          </NavLink>
          <NavLink
            exact
            to="/news-explorer-frontend/saved-news"
            activeClassName="activeSavedNews"
            className="header-bar__nav-link color-white"
            onClick={onChangeActiveStatus}
          >
            <p className="header-bar__saved-news">Saved news</p>
          </NavLink>

          <Link
            to="/news-explorer-frontend/"
            className={`header-bar__button ${
              pathName === '/news-explorer-frontend/' ? ' ' : 'color-black'
            }`}
            onClick={exitProfile}
          >
            {currentUser.name}
            <img
              className="header-bar__exit-img"
              src={
                pathName === '/news-explorer-frontend/'
                  ? exitImgWhite
                  : exitImgBlack
              }
              alt="знак выхода"
            />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navigation;
