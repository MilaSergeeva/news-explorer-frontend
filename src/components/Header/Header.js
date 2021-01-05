import "./Header.css";
import headerLogo from "../../images/newsExplorer.svg";
import React from "react";
import { Link, Route } from "react-router-dom";
import Navigation from "../Navigation/Navigation.js";

function Header() {
  return (
    <header className="header">
      <Route exact path="/">
        <div className="header-bar">
          <Link to="/" className="header-bar__link">
            <img className="header-bar__logo" src={headerLogo} alt="Логотип" />
          </Link>
          <Navigation />
        </div>
      </Route>
      <Route exact path="/saved-news">
        <div className="header-bar background-transparency">
          <Link to="/" className="header-bar__link">
            <img className="header-bar__logo" src={headerLogo} alt="Логотип" />
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
