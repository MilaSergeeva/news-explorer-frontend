import './Header.css';
import React from 'react';
import { Link, Route } from 'react-router-dom';
import headerLogoWhite from '../../images/newsExplorerWhite.svg';
import Navigation from '../Navigation/Navigation';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

function Header({
  onAutorizationClick,
  onChangeActiveStatus,
  onMenuTagClick,
  isMenuOpened,
  darkBackgroundHeader,
  onCloseMenu,
  loggedIn,
  onSignOut,
  pathName,
}) {
  return (
    <header
      className={`header ${
        isMenuOpened === true ? 'header__border-radius' : ' '
      }`}
    >
      <Route exact path="/">
        <div
          className={`header-bar ${
            darkBackgroundHeader === true ? 'dark-theme' : ' '
          }`}
        >
          <Link to="/" className="header-bar__logo-link">
            <img
              className="header-bar__logo"
              src={headerLogoWhite}
              alt="Логотип"
            />
          </Link>
          <div className="header-bar__menu-icon-container">
            <div
              className={`header-bar__menu-icon ${
                isMenuOpened ? 'change' : ' '
              }`}
              onClick={onMenuTagClick}
            >
              <div className="header-bar__menu-icon-line1"></div>
              <div className="header-bar__menu-icon-line2"></div>
            </div>
          </div>
          <Navigation
            style={{ color: '#fff' }}
            isMenuOpened={isMenuOpened}
            onAutorizationClick={onAutorizationClick}
            onChangeActiveStatus={onChangeActiveStatus}
            onCloseMenu={onCloseMenu}
            loggedIn={loggedIn}
            onSignOut={onSignOut}
            pathName={pathName}
          />
        </div>
      </Route>
      <Route exact path="/saved-news">
        <SavedNewsHeader
          isMenuOpened={isMenuOpened}
          onMenuTagClick={onMenuTagClick}
          onChangeActiveStatus={onChangeActiveStatus}
          onCloseMenu={onCloseMenu}
          onSignOut={onSignOut}
        />
      </Route>
    </header>
  );
}

export default Header;
