/* eslint-disable no-unused-vars */
import './SavedNewsHeader.css';
import React from 'react';
import { Link } from 'react-router-dom';
import headerLogoBlack from '../../images/newsExplorerBlack.svg';
import Navigation from '../Navigation/Navigation';

function SavedNewsHeader({
  isMenuOpened,
  onMenuTagClick,
  onChangeActiveStatus,
  onCloseMenu,
  onLogout,
}) {
  return (
    <div className="header-bar white-theme">
      <Link to="/" className="header-bar__logo-link">
        <img className="header-bar__logo" src={headerLogoBlack} alt="Логотип" />
      </Link>
      <div className="header-bar__menu-icon-container">
        <div className="header-bar__menu-icon" onClick={onMenuTagClick}>
          <div className="header-bar__menu-icon-line1 white-theme-menu-icon-background"></div>
          <div className="header-bar__menu-icon-line2 white-theme-menu-icon-background"></div>
        </div>
      </div>
      <Navigation
        style={{ color: '#000' }}
        isMenuOpened={isMenuOpened}
        onChangeActiveStatus={onChangeActiveStatus}
        onCloseMenu={onCloseMenu}
        onLogout={onLogout}
      />
    </div>
  );
}

export default SavedNewsHeader;
