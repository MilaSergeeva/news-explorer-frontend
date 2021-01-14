import "./Navigation.css";
import exitImg from "../../images/exit.svg";
import React, { useState } from "react";
import { NavLink, Route, Switch, Link } from "react-router-dom";
import cn from "classnames";

function Navigation({ isMenuOpened }) {
  const [isActive, setIsActive] = useState(true);

  const toggleLinkActiveStatus = () => {
    isActive ? setIsActive(false) : setIsActive(true);
  };

  return (
    <div
      className={`header-bar__menu ${isMenuOpened === true ? "opened" : ""}`}
    >
      <NavLink
        exact
        to="/"
        activeClassName="activeMain"
        className="header-bar__nav-link color-black"
        onClick={toggleLinkActiveStatus}
      >
        <p>Главная</p>
      </NavLink>
      <NavLink
        exact
        to="/saved-news"
        activeClassName="activeSavedNews"
        className="header-bar__nav-link color-white"
        onClick={toggleLinkActiveStatus}
      >
        <p className="header-bar__saved-news">Сохраненные статьи</p>
      </NavLink>

      <Switch>
        <Route exact path="/">
          <button
            type="button"
            aria-label="Авторизация"
            className="header-bar__button"
          >
            Авторизация
          </button>
        </Route>
        <Route exact path="/saved-news">
          <Link to="/">
            <button
              type="button"
              aria-label="Авторизация"
              className="header-bar__button color-black"
            >
              Имя
              <img
                className="header-bar__exit-img"
                src={exitImg}
                alt="знак выхода"
              />
            </button>
          </Link>
        </Route>
      </Switch>
    </div>
  );
}

export default Navigation;
