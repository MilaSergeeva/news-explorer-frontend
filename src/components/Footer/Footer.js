/* eslint-disable no-unused-vars */
import './Footer.css';
import React from 'react';
import { Link, Route } from 'react-router-dom';
import facebookLogo from '../../images/facebook.svg';
import gitHubLogo from '../../images/gitHub.svg';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; 2020 Supersite, Powered by News API
      </p>
      <Route path="/*">
        <nav className="footer__nav">
          <ul className="footer__nav-links">
            <li>
              <Link to="/" className="footer__nav-link">
                <p className="footer__link-to-main">Главная</p>
              </Link>
            </li>
            <li>
              <a
                href="https://praktikum.yandex.ru"
                className="footer__nav-link"
              >
                <p className="footer__link-to-praktikum">Яндекс.Практикум</p>
              </a>
            </li>
          </ul>

          <ul className="footer__sosial-links">
            <li>
              <a href="https://github.com" className="footer__gitHub-logo">
                <img
                  className="footer__link-to-gitHub"
                  src={gitHubLogo}
                  alt="gitHub_logo"
                />
              </a>
            </li>
            <li>
              <a href="https://facebook.com" className="footer__facebook-logo">
                <img
                  className="footer__link-to-facebook"
                  src={facebookLogo}
                  alt="facebook"
                />
              </a>
            </li>
          </ul>
        </nav>
      </Route>
    </footer>
  );
}

export default Footer;
