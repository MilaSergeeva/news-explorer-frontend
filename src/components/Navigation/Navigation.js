import "./Navigation.css";
import exitImg from "../../images/exit.svg";
import React, { useState } from "react";
import { NavLink, Route, Switch, Link } from "react-router-dom";
import cn from "classnames";

function Navigation({
  isMenuOpened,
  onAutorizationClick,
  onChangeActiveStatus,
  onCloseMenu,
}) {
  // const [isActiveMenuLink, setIsActiveMenuLink] = useState(true);

  // const toggleLinkActiveStatus = () => {
  //   isActive ? setIsActiveMenuLink(false) : setIsActiveMenuLink(true);
  // };

  return (
    <div
      className={`header-bar__menu ${isMenuOpened === true ? "opened" : ""}`}
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

      <Switch>
        <Route exact path="/">
          <button
            type="button"
            aria-label="Авторизация"
            className="header-bar__button"
            onClick={onAutorizationClick}
          >
            Авторизация
          </button>
        </Route>
        <Route exact path="/saved-news">
          <Link
            to="/"
            className="header-bar__button color-black"
            onClick={onCloseMenu}
          >
            Имя
            <img
              className="header-bar__exit-img"
              src={exitImg}
              alt="знак выхода"
            />
            {/* </button> */}
          </Link>
        </Route>
      </Switch>
    </div>
  );
}

export default Navigation;
