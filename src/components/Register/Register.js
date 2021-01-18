import "./Register.css";
import React, { useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import useValidationForForm from "../../hooks/useForm.js";

const Register = ({ onClose, isOpen, onRedirect, onClick, onRegister }) => {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useValidationForForm();

  const handleSignUpSubmit = () => {
    if (isValid) {
      onRegister();
    } else {
      onClose();
    }
  };

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  const regPassword =
    "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&~])[A-Za-z\\d@$!%*#?&~]{8,}$";

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin(email, password);
  };

  return (
    <PopupWithForm
      name="regstration"
      title="Регистрация"
      savebtn="Зарегистрироваться"
      onClose={onClose}
      onClick={onClick}
      isOpen={isOpen}
      isValid={isValid}
      redirectTo="Войти"
      onRedirect={onRedirect}
      onSubmit={onRegister}
    >
      <label className="popup__input-container">
        <p className="popup__input-title">Email</p>
        <input
          type="email"
          name="email"
          placeholder="Введите email"
          className="popup__input"
          minLength="5"
          maxLength="40"
          autoComplete="off"
          value={values.email}
          onChange={handleChange}
          required
        />
        <span className="popup__error">{errors.email || ""}</span>
      </label>

      <label className="popup__input-container">
        <p className="popup__input-title">Пароль</p>
        <input
          type="password"
          name="password"
          placeholder="Введите пароль"
          className="popup__input"
          minLength="8"
          maxLength="30"
          autoComplete="off"
          pattern={regPassword}
          value={values.password}
          onChange={handleChange}
          required
        />
        <span className="popup__error">
          {errors.password
            ? "Пароль должен включать буквы, как минимум 1 цифра, 1 спецсимвол, не менее 8 знаков"
            : ""}
        </span>
      </label>

      <label className="popup__input-container">
        <p className="popup__input-title">Имя</p>
        <input
          type="text"
          name="name"
          placeholder="Введите своё имя"
          className="popup__input"
          minLength="2"
          maxLength="30"
          autoComplete="off"
          value={values.name}
          onChange={handleChange}
          required
        />
        <span className="popup__error">{errors.name || ""}</span>
      </label>
    </PopupWithForm>
  );
};

export default Register;
