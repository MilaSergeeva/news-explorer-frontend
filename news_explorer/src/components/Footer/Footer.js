import "./Footer.css";
import gitHub_Logo from "../../images/";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; 2020 Людмила Сергеева</p>
      <Route path="/*">
        <nav class="footer__nav">
          <ul class="footer__links">
            <li>
              <Link to="/" className="header-bar__link-to-main">
                <p className="footer__link-to-main">Главная</p>
              </Link>
            </li>
            <li>
              <Link to="https://praktikum.yandex.ru" className="footer__link">
                <p className="footer__link-to-praktikum">Яндекс.Практикум</p>
              </Link>
            </li>
          </ul>
        </nav>
        <ul class="footer__sosial-links">
          <Link to="https://praktikum.yandex.ru" className="footer__link">
            <img
              className="header-bar__logo"
              src={headerLogo}
              alt="gitHub_logo"
            />
          </Link>
          <Link to="https://praktikum.yandex.ru" className="facebook_logo">
            <img className="header-bar__logo" src={headerLogo} alt="Логотип" />
          </Link>
        </ul>
      </Route>
    </footer>
  );
}

export default Footer;
