import React, { useState, useEffect, useRef } from "react";
// import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import "./App.css";
import cardsList from "../../utils/cardslist.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";

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
  const myRef = useRef();

  //закрытие модального окна
  function closeAllPopups() {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
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
    if (isLoginPopupOpen === true) {
      setIsLoginPopupOpen(false);
      setIsRegisterPopupOpen(true);
    } else {
      setIsLoginPopupOpen(true);
      setIsRegisterPopupOpen(false);
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
    if (!myRef.current.contains(e.target)) {
      setClickedOutside(true);
      closeAllPopups();
    }
  };

  const handleClickInside = () => setClickedOutside(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

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
            // onUpdateUser={handleUpdateUser}
            onRedirect={handleRedirect}
            onRef={myRef}
            onClick={handleClickInside}
          />

          <Register
            isOpen={isRegisterPopupOpen}
            onClose={closeAllPopups}
            // onUpdateUser={handleUpdateUser}
            onRedirect={handleRedirect}
          />
        </section>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
