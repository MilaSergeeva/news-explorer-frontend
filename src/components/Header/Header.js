import "./Header.css";

import headerLogoWhite from "../../images/newsExplorerWhite.svg";
import headerLogoBlack from "../../images/newsExplorerBlack.svg";
import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import Navigation from "../Navigation/Navigation.js";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.js";

function Header() {
  const [darkBackground, setDarkBackground] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const toggleBakgroundColor = () => {
    if (darkBackground === false) {
      setDarkBackground(true);
    } else {
      setDarkBackground(false);
    }
  };

  const toggleMenu = () => {
    if (isMenuOpened === false) {
      setIsMenuOpened(true);
    } else {
      setIsMenuOpened(false);
    }
  };

  const animateMenuTag = (e) => {
    e.target.classList.toggle("change");
    toggleBakgroundColor();
    toggleMenu();
  };

  return (
    <header
      className={`header ${
        isMenuOpened === true ? "header__border-radius" : " "
      }`}
    >
      <Route exact path="/">
        <div
          className={`header-bar ${
            darkBackground === true ? "dark-theme" : " "
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
            <div className="header-bar__menu-icon" onClick={animateMenuTag}>
              <div className="header-bar__menu-icon-line1"></div>
              <div className="header-bar__menu-icon-line2"></div>
            </div>
          </div>
          <Navigation
            style={{ color: "#fff" }}
            toggleMenu={toggleMenu}
            isMenuOpened={isMenuOpened}
          />
        </div>
      </Route>
      <Route exact path="/saved-news">
        <SavedNewsHeader isMenuOpened={isMenuOpened} onClick={animateMenuTag} />
      </Route>
    </header>
  );
}

export default Header;
