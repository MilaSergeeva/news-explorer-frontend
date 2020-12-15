import "./Navigation.css";
import exitImg from "../../images/exit.svg";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";

function Navigation() {
  return (
    <div className="header-bar__menu">
      <Route path="/*">
        <Link to="/" className="header-bar__link-to-main">
          <p>Главная</p>
        </Link>
      </Route>

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
          <p className="header-bar__saved-news">Сохраненные статьи</p>
          <button
            type="button"
            aria-label="Авторизация"
            className="header-bar__button"
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
