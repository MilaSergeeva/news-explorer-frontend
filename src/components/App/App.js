import React, { useState, useEffect } from "react";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { apiClient, buildApiClient } from "../../utils/MainApi";
import { newsApi } from "../../utils/NewsApi";
import "./App.css";
import cardsList from "../../utils/cardslist.js";
import * as userAuth from "../../utils/authorization.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import InfoTooltip from "../InfoTooltip/InfoTooltip.js";
import { getToken, removeToken, setToken } from "../../utils/token.js";
import { useLocation } from "react-router-dom";
import backgroundImage from "../../images/header_background.png";

function App() {
  const [currentUser, setСurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);
  const [savedNewsCards, setSavedNewsCards] = useState([]);
  const [cards, setCards] = useState(cardsList);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [darkBackgroundHeader, setDarkBackgroundHeader] = useState(false);
  const [clickedOutside, setClickedOutside] = useState(false);
  const [isActiveMenuLink, setIsActiveMenuLink] = useState(true);
  const [isInfoToolsPopupOpen, setIsInfoToolsPopupOpen] = useState(false);
  const [messageOnRegister, setMessageOnRegister] = useState("");
  const [messageOnLogin, setMessageOnLogin] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  const pathName = useLocation().pathname;

  //закрытие модального окна
  function closeAllPopups() {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsInfoToolsPopupOpen(false);
  }

  //нажатие кнопки авторизации в меню
  const handleAutorizationClick = () => {
    setIsLoginPopupOpen(true);

    if (isMenuOpened === true) {
      setIsMenuOpened(false);
      setDarkBackgroundHeader(false);
    }
  };

  //перенаправление внутри модального окна (войти/зарегистрироваться)
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

  //переключение фона всплывающего бургер меню
  const toggleBakgroundColor = () => {
    if (darkBackgroundHeader === false) {
      setDarkBackgroundHeader(true);
    } else {
      setDarkBackgroundHeader(false);
    }
  };

  //закрытиее или открытие выпадающего меню
  const toggleMenu = () => {
    if (isMenuOpened === false) {
      setIsMenuOpened(true);
    } else {
      setIsMenuOpened(false);
    }
  };

  //анимация иконки выпадающего меню
  const animateMenuTag = (e) => {
    e.target.classList.toggle("change");
    toggleBakgroundColor();
    toggleMenu();
  };

  //закрытие всплывающего меню
  const handleCloseMenu = () => {
    if (isMenuOpened === true) {
      setIsMenuOpened(false);
      if (darkBackgroundHeader === true) {
        setDarkBackgroundHeader(false);
      }
    }
  };

  //переключение активной ссылки меню
  const toggleLinkActiveStatus = () => {
    isActiveMenuLink ? setIsActiveMenuLink(false) : setIsActiveMenuLink(true);
    handleCloseMenu();
  };

  //закрытие модального окна по оверлей
  const handleClickOutside = (e) => {
    if (e.target.classList.contains("popup")) {
      setClickedOutside(true);
      closeAllPopups();
    }
  };

  const handleClickInside = () => setClickedOutside(false);

  useEffect(() => {
    const elements = document.getElementsByClassName("popup");

    for (const element of elements) {
      element.addEventListener("mousedown", handleClickOutside);
    }
  }, []);

  useEffect(() => {
    function handleCloseByEsc(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    document.addEventListener("keydown", handleCloseByEsc);
    return () => {
      document.removeEventListener("keydown", handleCloseByEsc);
    };
  }, []);

  const handleLogout = () => {
    removeToken();
    setLoggedIn(false);
  };

  const handleLogin = (email, password) => {
    userAuth
      .authorize(email, password)
      .then((data) => {
        setToken(data.token);
        setMessageOnLogin("");
        closeAllPopups();
        setLoggedIn(true);

        // history.push("/users/me");
      })
      .catch((err) => {
        setMessageOnLogin("Ошибка авторизации. Повторите попытку.");
      });
  };

  const handleRegister = (email, password, name) => {
    console.log("start register");
    userAuth
      .register(email, password, name)
      .then(() => {
        closeAllPopups();
        setSignupSuccess(true);
        setIsInfoToolsPopupOpen(true);
        setMessageOnRegister("");

        // history.push("/signin");
      })
      .catch((res) => {
        setIsInfoToolsPopupOpen(true);
        setSignupSuccess(false);
        setMessageOnRegister(`${res.message}`);
      });
  };

  React.useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      setLoggedIn(false);

      return;
    }

    let apiJWT = buildApiClient(jwt);

    Promise.all([apiJWT.getUserInfo(), apiJWT.getSavedNews()])
      .then(([userInfo, newsElements]) => {
        setСurrentUser(userInfo);
        setSavedNewsCards(newsElements);
      })
      .catch((err) => {
        // potenitally need to log out
        setLoggedIn(false);
        removeToken();
      });
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div
          className="page"
          style={{
            backgroundImage: `${
              pathName === "/" ? `url(${backgroundImage})` : "none"
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
            onLogout={handleLogout}
            loggedIn={loggedIn}
            pathName={pathName}
          />
          <main className="content">
            <Main
              loggedIn={loggedIn}
              savedNewsCards={savedNewsCards}
              cards={cards}
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
