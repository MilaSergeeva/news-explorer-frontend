/* eslint-disable spaced-comment */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable prefer-template */
/* eslint-disable operator-linebreak */
/* eslint-disable space-infix-ops */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { api, apiClient, buildApiClient } from '../../utils/MainApi';
import { newsApi as findNews } from '../../utils/NewsApi';
import * as userAuth from '../../utils/authorization';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { getToken, removeToken, setToken } from '../../utils/token';
import backgroundImage from '../../images/header_background.png';

function App() {
  const lastSearchResult = JSON.parse(localStorage.getItem('articles'));
  const [currentUser, setСurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);
  const [savedNews, setSavedNews] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [darkBackgroundHeader, setDarkBackgroundHeader] = useState(false);
  const [clickedOutside, setClickedOutside] = useState(false);
  const [isActiveMenuLink, setIsActiveMenuLink] = useState(true);
  const [isInfoToolsPopupOpen, setIsInfoToolsPopupOpen] = useState(false);
  const [messageOnRegister, setMessageOnRegister] = useState('');
  const [messageOnLogin, setMessageOnLogin] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [searchSuccess, setSearchSuccess] = useState(null);
  const [preloaderIsOn, setPreloaderIsOn] = useState(false);
  const [keyword, setKeyword] = useState('');

  const pathName = useLocation().pathname;
  const dateTime = new Date();
  const currentDate = dateTime.toISOString().substr(0, 16);

  function deductDays(d, days) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() - days);
  }

  const dateWeekAgo = deductDays(dateTime, 7).toISOString().substr(0, 16);
  const apiKey = '670ce72cce9c46b28214a8e2e4e4f7da';

  // закрытие модального окна
  function closeAllPopups() {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsInfoToolsPopupOpen(false);
    setMessageOnLogin('');
    setMessageOnRegister('');
  }

  // нажатие кнопки авторизации в меню
  const handleAutorizationClick = () => {
    setIsLoginPopupOpen(true);

    if (isMenuOpened === true) {
      setIsMenuOpened(false);
      setDarkBackgroundHeader(false);
    }
  };

  // перенаправление внутри модального окна (войти/зарегистрироваться)
  const handleRedirect = () => {
    if (isLoginPopupOpen === false || isInfoToolsPopupOpen === true) {
      setIsLoginPopupOpen(true);
      setIsRegisterPopupOpen(false);
      setIsInfoToolsPopupOpen(false);
    } else {
      setIsLoginPopupOpen(false);
      setIsRegisterPopupOpen(true);
    }
  };

  // переключение фона всплывающего бургер меню
  const toggleBakgroundColor = () => {
    if (darkBackgroundHeader === false) {
      setDarkBackgroundHeader(true);
    } else {
      setDarkBackgroundHeader(false);
    }
  };

  // закрытиее или открытие выпадающего меню
  const toggleMenu = () => {
    if (isMenuOpened === false) {
      setIsMenuOpened(true);
    } else {
      setIsMenuOpened(false);
    }
  };

  // анимация иконки выпадающего меню
  const animateMenuTag = (e) => {
    e.target.classList.toggle('change');
    toggleBakgroundColor();
    toggleMenu();
  };

  // закрытие всплывающего меню
  const handleCloseMenu = () => {
    if (isMenuOpened === true) {
      setIsMenuOpened(false);
      if (darkBackgroundHeader === true) {
        setDarkBackgroundHeader(false);
      }
    }
  };

  // переключение активной ссылки меню
  const toggleLinkActiveStatus = () => {
    isActiveMenuLink ? setIsActiveMenuLink(false) : setIsActiveMenuLink(true);
    handleCloseMenu();
  };

  // закрытие модального окна по оверлей
  const handleClickOutside = (e) => {
    if (e.target.classList.contains('popup')) {
      setClickedOutside(true);
      closeAllPopups();
    }
  };

  const handleClickInside = () => setClickedOutside(false);

  useEffect(() => {
    const elements = document.getElementsByClassName('popup');

    // eslint-disable-next-line no-restricted-syntax
    for (const element of elements) {
      element.addEventListener('mousedown', handleClickOutside);
    }
  }, []);

  useEffect(() => {
    function handleCloseByEsc(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', handleCloseByEsc);
    return () => {
      document.removeEventListener('keydown', handleCloseByEsc);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('articles');
    removeToken();
    setArticles([]);
    setSearchSuccess(null);
    setLoggedIn(false);
  };

  const handleLogin = (email, password) => {
    userAuth
      .authorize(email, password)
      .then((data) => {
        setToken(data.token);
        setMessageOnLogin('');
        closeAllPopups();
        setLoggedIn(true);

        // history.push("/users/me");
      })
      .catch((err) => {
        setMessageOnLogin('Ошибка авторизации. Повторите попытку.');
      });
  };

  const handleRegister = (email, password, name) => {
    userAuth
      .register(email, password, name)
      .then(() => {
        closeAllPopups();
        setSignupSuccess(true);
        setIsInfoToolsPopupOpen(true);
        setMessageOnRegister('');

        // history.push("/signin");
      })
      .catch((res) => {
        setIsInfoToolsPopupOpen(true);
        setSignupSuccess(false);
        setMessageOnRegister('Ошибка регистрации. Повторите попытку.');
      });
  };

  const handleSaveNews = (article) => {
    const newsPayload = {
      keyword,
      title: article.title,
      text: article.description,
      date: article.publishedAt,
      source: article.source.name,
      link: article.url,
      image: article.urlToImage,
    };

    const jwt = getToken();
    const apiJWT = buildApiClient(jwt);

    const found = savedNews.find((el) => el.title === article.title);

    if (found) {
      api
        .deleteSavedNews(found._id)
        .then(() => apiJWT.getSavedNews())
        .then((result) => setSavedNews(result));
    } else {
      api
        .saveNews(newsPayload)
        .then(() => apiJWT.getSavedNews())
        .then((result) => setSavedNews(result));
    }
  };

  const handleFindNews = (input) => {
    setPreloaderIsOn(true);
    findNews
      .getNews(apiKey, input, currentDate, dateWeekAgo, 100)
      .then((body) => {
        setPreloaderIsOn(null);
        localStorage.removeItem('articles');
        setArticles(body.articles);
        setSearchSuccess(true);
        setKeyword(input);
        localStorage.setItem('articles', JSON.stringify(body.articles));
      })
      .catch((res) => {
        setPreloaderIsOn(false);
        setSearchSuccess(false);
      });
  };

  React.useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      setLoggedIn(false);

      return;
    }

    const apiJWT = buildApiClient(jwt);

    // setArticles(JSON.parse(localStorage.getItem('articles')));

    Promise.all([apiJWT.getUserInfo(), apiJWT.getSavedNews()])
      .then(([userInfo, newsElements]) => {
        setСurrentUser(userInfo);
        setSavedNews(newsElements);
      })
      .catch((err) => {
        // potenitally need to log out
        setLoggedIn(false);
        removeToken();
      });
  }, [loggedIn]);

  React.useEffect(() => {
    if ('articles' in localStorage) {
      try {
        const localArticles = JSON.parse(localStorage.getItem('articles'));

        setArticles(localArticles);

        if (localArticles.length > 0) {
          setSearchSuccess(true);
        }
      } catch (err) {
        console.log('Failed to load articles from local storage');
      }
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div
          className="page"
          style={{
            backgroundImage: `${pathName === '/' && `url(${backgroundImage})`}`,
          }}
        >
          <Header
            onAutorizationClick={handleAutorizationClick}
            onChangeActiveStatus={toggleLinkActiveStatus}
            onMenuTagClick={animateMenuTag}
            isMenuOpened={isMenuOpened}
            onCloseMenu={handleCloseMenu}
            darkBackgroundHeader={darkBackgroundHeader}
            onLogout={handleLogout}
            loggedIn={loggedIn}
            pathName={pathName}
          />
          <main className="content">
            <Main
              loggedIn={loggedIn}
              savedNews={savedNews}
              articles={articles}
              onSearch={handleFindNews}
              searchSuccess={searchSuccess}
              preloaderIsOn={preloaderIsOn}
              onToggleClick={handleSaveNews}
            />
          </main>
          <Footer />
        </div>

        <section className="popup-forms">
          <PopupWithForm name="card-del" title="Вы уверены?" savebtn="Да" />

          <Login
            isOpen={isLoginPopupOpen}
            onClose={closeAllPopups}
            onRedirect={handleRedirect}
            onClick={handleClickInside}
            onLogin={handleLogin}
            messageOnLogin={messageOnLogin}
          />

          <Register
            isOpen={isRegisterPopupOpen}
            onClose={closeAllPopups}
            onRedirect={handleRedirect}
            onClick={handleClickInside}
            onRegister={handleRegister}
            messageOnRegister={messageOnRegister}
          />

          <InfoTooltip
            success={signupSuccess}
            isOpen={isInfoToolsPopupOpen}
            onClose={closeAllPopups}
            onRedirect={handleRedirect}
            onClick={handleClickInside}
          />
        </section>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
