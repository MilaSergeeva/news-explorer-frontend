import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { api, buildApiClient } from '../../utils/MainApi';
import newsApi from '../../utils/NewsApi';
import * as userAuth from '../../utils/authorization';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { getToken, removeToken, setToken } from '../../utils/token';
import backgroundImage from '../../images/header_background.png';
import { API_KEY } from '../../config';

const getQuery = () => {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
};

function App() {
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const history = useHistory();
  const pathName = useLocation().pathname;
  const dateTime = new Date();
  const currentDate = dateTime.toISOString().substr(0, 16);

  function deductDays(d, days) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() - days);
  }

  const dateWeekAgo = deductDays(dateTime, 7).toISOString().substr(0, 16);

  // закрытие модального окна
  function closeAllPopups() {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsInfoToolsPopupOpen(false);
    setMessageOnLogin('');
    setMessageOnRegister('');

    history.push('/news-explorer-frontend');
  }

  // нажатие кнопки авторизации в меню
  const handleAutorizationClick = () => {
    setIsRegisterPopupOpen(true);

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
    localStorage.removeItem('query');

    removeToken();
    setArticles([]);
    setSearchSuccess(null);
    setLoggedIn(false);

    history.push('/news-explorer-frontend');
  };

  const handleLogin = (email, password) => {
    setIsSubmitting(true);
    userAuth
      .authorize(email, password)
      .then((data) => {
        setToken(data.token);
        setMessageOnLogin('');
        closeAllPopups();
        setLoggedIn(true);
        setIsSubmitting(false);
      })
      .catch((err) => {
        setMessageOnLogin('Ошибка авторизации. Повторите попытку.');
        setIsSubmitting(false);
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
      title: article.title || '',
      text: article.description || '',
      date: article.publishedAt || '',
      source: article.source.name || '',
      link: article.url,
      image:
        article.urlToImage ||
        'https://s1.reutersmedia.net/resources_v2/images/rcom-default.png?w=800',
    };

    const jwt = getToken();
    const apiJWT = buildApiClient(jwt);

    const found = savedNews.find((el) => el.title === article.title);

    if (found) {
      apiJWT
        .deleteSavedNews(found._id)
        .then(() => apiJWT.getSavedNews())
        .then((result) => setSavedNews(result));
    } else {
      apiJWT
        .saveNews(newsPayload)
        .then(() => apiJWT.getSavedNews())
        .then((result) => setSavedNews(result));
    }
  };

  const handleFindNews = (input) => {
    setPreloaderIsOn(true);
    newsApi
      .getNews(API_KEY, input, currentDate, dateWeekAgo, 100)
      .then((body) => {
        setPreloaderIsOn(false);
        localStorage.removeItem('articles');
        setArticles(body.articles);
        if (body.articles.length > 0) {
          setSearchSuccess(true);
        } else {
          setSearchSuccess(false);
        }

        setKeyword(input);
        localStorage.setItem('articles', JSON.stringify(body.articles));
        localStorage.setItem('query', input);
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
        console.error(
          `Failed to load articles from local storage. Error ${err.message}`,
        );
      }
    }

    if ('query' in localStorage) {
      setKeyword(localStorage.getItem('query'));
    }
  }, []);

  useEffect(() => {
    setIsLoginPopupOpen(!!getQuery().get('showAuth'));
  }, [!!getQuery().get('showAuth')]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div
          className="page"
          style={{
            backgroundImage: `${
              pathName === '/news-explorer-frontend' &&
              `url(${backgroundImage})`
            }`,
          }}
        >
          <Header
            onAutorizationClick={handleAutorizationClick}
            onChangeActiveStatus={toggleLinkActiveStatus}
            onMenuTagClick={animateMenuTag}
            isMenuOpened={isMenuOpened}
            onCloseMenu={handleCloseMenu}
            darkBackgroundHeader={darkBackgroundHeader}
            onSignOut={handleLogout}
            loggedIn={loggedIn}
            pathName={pathName}
            currentUser={currentUser}
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
              currentUser={currentUser}
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
            isSubmitting={isSubmitting}
          />

          <Register
            isOpen={isRegisterPopupOpen}
            onClose={closeAllPopups}
            onRedirect={handleRedirect}
            onClick={handleClickInside}
            onRegister={handleRegister}
            messageOnRegister={messageOnRegister}
            isSubmitting={isSubmitting}
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
