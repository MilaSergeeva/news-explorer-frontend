import React from "react";
import "./Login.css";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";

const Login = ({ onClose, isOpen, onRedirect, onClick, onRef }) => {
  return (
    <PopupWithForm
      name="login"
      title="Вход"
      savebtn="Войти"
      isOpen={isOpen}
      onClose={onClose}
      onRedirect={onRedirect}
      onClick={onClick}
      onRef={onRef}
      redirectTo=" Зарегистрироваться"
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
          required
        />
        <span className="popup__error"></span>
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
          required
        />
        <span className="popup__error"></span>
      </div>
    </PopupWithForm>
  );
};

export default Login;
