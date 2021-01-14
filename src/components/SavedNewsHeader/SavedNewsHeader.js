import "./SavedNewsHeader.css";
import headerLogoBlack from "../../images/newsExplorerBlack.svg";
import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import Navigation from "../Navigation/Navigation.js";

function SavedNewsHeader({ isMenuOpened, onClick }) {
  return (
    <div className="header-bar white-theme">
      <Link to="/" className="header-bar__logo-link">
        <img className="header-bar__logo" src={headerLogoBlack} alt="Логотип" />
      </Link>
      <div className="header-bar__menu-icon-container">
        <div className="header-bar__menu-icon" onClick={onClick}>
          <div className="header-bar__menu-icon-line1 white-theme-menu-icon-background"></div>
          <div className="header-bar__menu-icon-line2 white-theme-menu-icon-background"></div>
        </div>
      </div>
      <Navigation style={{ color: "#000" }} isMenuOpened={isMenuOpened} />
    </div>
  );
}

export default SavedNewsHeader;
