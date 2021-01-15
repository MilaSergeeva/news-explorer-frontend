import "./Register.css";
import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";

const Register = ({
  onClose,
  isOpen,
  onRedirect,
  onClick,
  modalRef,
  isValid,
  emailHandler,
  passwordHandler,
  nameHandler,
  inputError,
  inputValue,
}) => {
  return (
    <PopupWithForm
      name="regstration"
      title="Регистрация"
      savebtn="Зарегистрироваться"
      onClose={onClose}
      onClick={onClick}
      modalRef={modalRef}
      isOpen={isOpen}
      isValid={isValid}
      redirectTo="Войти"
      onRedirect={onRedirect}
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

      <div className="popup__input-container">
        <p className="popup__input-title">Имя</p>
        <input
          type="text"
          name="user-occupation"
          placeholder="Введите своё имя"
          className="popup__input"
          minLength="2"
          maxLength="30"
          autoComplete="off"
          value={inputValue.name}
          onInput={nameHandler}
          required
        />
        <span
          className={`popup__error ${
            inputError.name ? "popup__error_visible" : ""
          }`}
        >
          {inputError.name ? "Поле должно быть заполнено" : ""}
        </span>
      </div>
    </PopupWithForm>
  );
};

export default Register;
