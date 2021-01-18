import React, { useState, useEffect, useRef } from "react";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import "./App.css";
import cardsList from "../../utils/cardslist.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import InfoTooltip from "../InfoTooltip/InfoTooltip.js";
import useValidationForForm from "../../hooks/useForm.js";

function App() {
  const [currentUser, setСurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);
  const [cards, setCards] = useState(cardsList);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [darkBackgroundHeader, setDarkBackgroundHeader] = useState(false);
  const [clickedOutside, setClickedOutside] = useState(false);
  const [isActiveMenuLink, setIsActiveMenuLink] = useState(true);
  const [isInfoToolsPopupOpen, setIsInfoToolsPopupOpen] = useState(false);

  const [signupSuccess, setSignupSuccess] = useState(false);

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

  //сабмит формы решистрации
  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    closeAllPopups();
    setSignupSuccess(true);
    setIsInfoToolsPopupOpen(true);
  };

  //сабмит фолмы входа
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    closeAllPopups();
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header
            onAutorizationClick={handleAutorizationClick}
            onChangeActiveStatus={toggleLinkActiveStatus}
            onMenuTagClick={animateMenuTag}
            isMenuOpened={isMenuOpened}
            onCloseMenu={handleCloseMenu}
            darkBackgroundHeader={darkBackgroundHeader}
          />
          <main className="content">
            <Main loggedIn={loggedIn} cards={cards} />
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
            onLogin={handleLoginSubmit}
          />

          <Register
            isOpen={isRegisterPopupOpen}
            onClose={closeAllPopups}
            onRedirect={handleRedirect}
            onClick={handleClickInside}
            onRegister={handleRegisterSubmit}
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
