import "./Register.css";
import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";

const Register = ({ onClose, isOpen, onRedirect }) => {
  return (
    <PopupWithForm
      name="regstration"
      title="Регистрация"
      savebtn="Зарегистрироваться"
      onClose={onClose}
      isOpen={isOpen}
      redirectTo=" Войти"
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
          required
        />
        <span className="popup__error"></span>
      </div>
    </PopupWithForm>
  );
};

export default Register;
