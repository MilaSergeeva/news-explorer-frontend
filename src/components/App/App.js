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
  const modalRef = useRef();

  //закрытие модального окна
  function closeAllPopups() {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
  }

  //нажатие кнопки авторизации в меню
  const handleAutorizationClick = () => {
    console.log("clickef authorization");

    setIsLoginPopupOpen(true);

    if (isMenuOpened === true) {
      setIsMenuOpened(false);
      setDarkBackgroundHeader(false);
    }
  };

  //перенаправление внутри модального окна (войти/зарегистрироваться)
  const handleRedirect = () => {
    console.log("is login popup", isLoginPopupOpen, isRegisterPopupOpen);

    if (isLoginPopupOpen === true) {
      setIsLoginPopupOpen(false);
      setIsRegisterPopupOpen(true);
    } else {
      console.log("open login popup");
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
    if (!modalRef.current.contains(e.target)) {
      setClickedOutside(true);
      closeAllPopups();
    }
  };

  const handleClickInside = () => setClickedOutside(false);

  //валидация формы

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    name: "",
  });

  // наличие ошибки при вводе данных
  const [inputError, setInputError] = useState({
    email: false,
    password: false,
    name: false,
  });

  //валидность формы
  const [isValid, setIsValid] = useState(false);

  //состояние ошибки отправки формы
  //const [submitError, setSubmitError] = useState("");

  //обработчик инпута email
  function emailHandler(e) {
    setInputValue({ ...inputValue, email: e.target.value });
    const reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,15}$/i;
    if (!reg.test(e.target.value)) {
      setInputError({ ...inputError, email: true });
    } else {
      setInputError({ ...inputError, email: false });
    }
  }

  //обработчик инпута имени
  function nameHandler(e) {
    setInputValue({ ...inputValue, name: e.target.value });
    if (e.target.value.length < 3) {
      setInputError({ ...inputError, name: true });
    } else {
      setInputError({ ...inputError, name: false });
    }
  }

  //обработчик инпута имени
  function passwordHandler(e) {
    setInputValue({ ...inputValue, password: e.target.value });
    const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&~])[A-Za-z\d@$!%*#?&~]{8,}$/i;
    if (!reg.test(e.target.value)) {
      setInputError({ ...inputError, password: true });
    } else {
      setInputError({ ...inputError, password: false });
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  useEffect(() => {
    if (inputError.email & inputError.password & inputError.name) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
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
            modalRef={modalRef}
            onClick={handleClickInside}
            inputValue={inputValue}
            isValid={isValid}
            emailHandler={emailHandler}
            passwordHandler={passwordHandler}
            inputError={inputError}
          />

          <Register
            isOpen={isRegisterPopupOpen}
            onClose={closeAllPopups}
            onRedirect={handleRedirect}
            modalRef={modalRef}
            onClick={handleClickInside}
            inputValue={inputValue}
            isValid={isValid}
            emailHandler={emailHandler}
            passwordHandler={passwordHandler}
            nameHandler={nameHandler}
            inputError={inputError}
          />
        </section>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
