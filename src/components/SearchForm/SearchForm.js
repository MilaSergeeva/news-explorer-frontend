/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import './SearchForm.css';
import React from 'react';
import useValidationForForm from '../../hooks/useForm';

function SearchForm() {
  const {
    values,
    errors,
    isValid,
    handleChangeSearchForm,
  } = useValidationForForm();

  return (
    <div className="search-form">
      <h1 className="search-form__title">Что творится в мире?</h1>
      <p className="search-form__text">
        Находите самые свежие статьи на любую тему и сохраняйте в своём личном
        кабинете.
      </p>
      <div className="search-form__input-fild">
        <input
          type="text"
          name="search"
          placeholder={'Введите тему новости' || errors.search}
          className="search-form__input"
          minLength="2"
          maxLength="40"
          autoComplete="off"
          pattern="^[A-Za-zА-Яа-я]{2,40}$"
          value={values.search || ''}
          onChange={handleChangeSearchForm}
          required
        />

        <button
          type="button"
          aria-label="Искать"
          className="search-form__search-button"
        >
          Искать
        </button>
      </div>
    </div>
  );
}

export default SearchForm;
