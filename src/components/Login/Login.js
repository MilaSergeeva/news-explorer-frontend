import React, { useEffect } from 'react';
import './Login.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useValidationForForm from '../../hooks/useForm';

const Login = ({
  onClose,
  isOpen,
  onRedirect,
  onClick,
  onLogin,
  messageOnLogin,
  isSubmitting,
}) => {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useValidationForForm();

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    onLogin(values.email, values.password);
  };

  return (
    <PopupWithForm
      name="login"
      title="Вход"
      savebtn="Войти"
      isOpen={isOpen}
      onClose={onClose}
      onRedirect={onRedirect}
      onClick={onClick}
      isValid={isValid}
      redirectTo="Зарегистрироваться"
      onSubmit={handleLoginSubmit}
      errorMassageOnSubmit={messageOnLogin}
      isSubmitting={isSubmitting}
    >
      <fieldset className="popup__input-container">
        <p className="popup__input-title">Email</p>
        <input
          type="email"
          name="email"
          placeholder="Введите email"
          className="popup__input"
          minLength="5"
          maxLength="40"
          autoComplete="off"
          value={values.email || ''}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
        <span className="popup__error">{errors.email || ''}</span>
      </fieldset>

      <fieldset className="popup__input-container">
        <p className="popup__input-title">Пароль</p>
        <input
          type="password"
          name="password"
          placeholder="Введите пароль"
          className="popup__input"
          minLength="8"
          maxLength="30"
          autoComplete="off"
          value={values.password || ''}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
        <span className="popup__error">
          {errors.password
            ? 'Пароль должен включать буквы, как минимум 1 цифра, 1 спецсимвол, не менее 8 знаков'
            : ''}
        </span>
      </fieldset>
    </PopupWithForm>
  );
};

export default Login;
