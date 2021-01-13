import "./Navigation.css";
import exitImg from "../../images/exit.svg";
import React, { useState } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import cn from "classnames";

function Navigation({ isMenuOpened }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`header-bar__menu ${isMenuOpened === true ? "opened" : ""}`}
    >
      {/* <Route path="/*"> */}
      <NavLink
        activeStyle={{ borderBottom: "solid #fff 2px", color: "#fff" }}
        style={{ color: "#000" }}
        exact
        to="/"
        className="header-bar__nav-link"
      >
        <p>Главная</p>
      </NavLink>
      <NavLink
        activeStyle={{ borderBottom: "solid #000 2px", color: "#000" }}
        style={{ color: "#fff" }}
        exact
        to="/saved-news"
        className="header-bar__nav-link"
      >
        <p className="header-bar__saved-news">Сохраненные статьи</p>
      </NavLink>
      {/* </Route> */}

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
        </Route>
      </Switch>
    </div>
  );
}

export default Navigation;
