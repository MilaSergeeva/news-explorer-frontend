import "./Footer.css";
import facebook_Logo from "../../images/facebook.svg";
import gitHub_Logo from "../../images/gitHub.svg";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; 2020 Supersite, Powered by News API
      </p>
      <Route path="/*">
        <nav class="footer__nav">
          <ul class="footer__nav-links">
            <li>
              <Link to="/" className="footer__nav-link">
                <p className="footer__link-to-main">Главная</p>
              </Link>
            </li>
            <li>
              <Link
                to="https://praktikum.yandex.ru"
                className="footer__nav-link"
              >
                <p className="footer__link-to-praktikum">Яндекс.Практикум</p>
              </Link>
            </li>
          </ul>

          <ul class="footer__sosial-links">
            <li>
              <Link to="https://github.com" className="footer__gitHub-logo">
                <img
                  className="footer__link-to-gitHub"
                  src={gitHub_Logo}
                  alt="gitHub_logo"
                />
              </Link>
            </li>
            <li>
              <Link to="https://facebook.com" className="footer__facebook-logo">
                <img
                  className="footer__link-to-facebook"
                  src={facebook_Logo}
                  alt="facebook"
                />
              </Link>
            </li>
          </ul>
        </nav>
      </Route>
    </footer>
  );
}

export default Footer;
