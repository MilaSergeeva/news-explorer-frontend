import "./Header.css";
import headerLogo from "../../images/newsExplorer.svg";
import React from "react";
import { Link, Route } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm.js";
import Navigation from "../Navigation/Navigation.js";

function Header() {
  return (
    <header className="header">
      <div className="header-bar">
        <Route path="/*">
          <Link to="/" className="header-bar__link">
            <img className="header-bar__logo" src={headerLogo} alt="Логотип" />
          </Link>
        </Route>
        <Navigation />
      </div>
      <Route exact path="/">
        <SearchForm />
      </Route>
    </header>
  );
}

export default Header;
