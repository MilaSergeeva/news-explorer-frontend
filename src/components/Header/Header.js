import "./Header.css";
import headerLogoWhite from "../../images/newsExplorerWhite.svg";
import headerLogoBlack from "../../images/newsExplorerBlack.svg";
import React from "react";
import { Link, Route } from "react-router-dom";
import Navigation from "../Navigation/Navigation.js";

function Header() {
  return (
    <header className="header">
      <Route exact path="/">
        <div className="header-bar">
          <Link to="/" className="header-bar__logo-link">
            <img
              className="header-bar__logo"
              src={headerLogoWhite}
              alt="Логотип"
            />
          </Link>
          <div className="header-bar__menu-tag">
            <div className="header-bar__menu-tag-line1"></div>
            <div className="header-bar__menu-tag-line2"></div>
          </div>
          <Navigation />
        </div>
      </Route>
      <Route exact path="/saved-news">
        <div className="header-bar background-transparency">
          <Link to="/" className="header-bar__link">
            <img
              className="header-bar__logo"
              src={headerLogoBlack}
              alt="Логотип"
            />
          </Link>
          <Navigation />
        </div>
      </Route>
      {/* <div className="header-bar">
        <Route path="/*">
          <Link to="/" className="header-bar__link">
            <img className="header-bar__logo" src={headerLogo} alt="Логотип" />
          </Link>
        </Route>
        <Navigation />
      </div> */}
    </header>
  );
}

export default Header;
