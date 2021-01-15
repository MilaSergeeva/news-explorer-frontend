import React from "react";
import "./Login.css";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";

const Login = ({
  onClose,
  isOpen,
  onRedirect,
  onClick,
  modalRef,
  inputValue,
  isValid,
  emailHandler,
  passwordHandler,
  inputError,
}) => {
  return (
    <PopupWithForm
      name="login"
      title="Вход"
      savebtn="Войти"
      isOpen={isOpen}
      onClose={onClose}
      onRedirect={onRedirect}
      onClick={onClick}
      modalRef={modalRef}
      isValid={isValid}
      redirectTo="Зарегистрироваться"
    >
      <div className="popup__input-container">
        <p className="popup__input-title">Email</p>
        <input
          type="email"
          name="email"
          placeholder="Введите email"
          className="popup__input"
          minLength="5"
          maxLength="40"
          autoComplete="off"
          value={inputValue.email}
          onInput={emailHandler}
          required
        />
        <span
          className={`popup__error ${
            inputError.email ? "popup__error_visible" : ""
          }`}
        >
          {inputError.email ? "Нeправильный формат email" : ""}
        </span>
      </div>

      <div className="popup__input-container">
        <p className="popup__input-title">Пароль</p>
        <input
          type="password"
          name="user-occupation"
          placeholder="Введите пароль"
          className="popup__input"
          minLength="8"
          maxLength="30"
          autoComplete="off"
          value={inputValue.password}
          onInput={passwordHandler}
          required
        />
        <span
          className={`popup__error ${
            inputError.password ? "popup__error_visible" : ""
          }`}
        >
          {inputError.password
            ? "Нeправильный формат пароля. Минимум 8 знаков, цыфр, букв и специальных символов"
            : ""}
        </span>
      </div>
    </PopupWithForm>
  );
};

export default Login;
