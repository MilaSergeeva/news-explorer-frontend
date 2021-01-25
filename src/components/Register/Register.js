import './Register.css';
import React, { useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useValidationForForm from '../../hooks/useForm';

const Register = ({
  onClose,
  isOpen,
  onRedirect,
  onClick,
  onRegister,
  messageOnRegister,
  isSubmitting,
}) => {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useValidationForForm();

  const regPassword =
    '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&~])[A-Za-z\\d@$!%*#?&~]{8,}$';

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    onRegister(values.email, values.password, values.name);
  };

  console.log(isValid);

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
      onSubmit={handleRegisterSubmit}
      errorMassageOnSubmit={messageOnRegister}
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
          pattern={regPassword}
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

      <fieldset className="popup__input-container">
        <p className="popup__input-title">Имя</p>
        <input
          type="text"
          name="name"
          placeholder="Введите своё имя"
          className="popup__input"
          minLength="2"
          maxLength="30"
          autoComplete="off"
          value={values.name || ''}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
        <span className="popup__error">{errors.name || ''}</span>
      </fieldset>
    </PopupWithForm>
  );
};

export default Register;
