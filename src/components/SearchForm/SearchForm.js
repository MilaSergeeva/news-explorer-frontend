import './SearchForm.css';
import React, { useState, useEffect } from 'react';

function SearchForm({ onSearch }) {
  const [placeholderMessage, setPlaceholderMessage] = useState(
    'Введите тему новости',
  );

  const [inputValue, setInputValue] = useState('');
  const [isSearchFormValid, setIsSearchFormValid] = React.useState(false);

  const handleChangeSearchForm = (event) => {
    const { target } = event;
    const { value } = target;

    setInputValue(value);
    setIsSearchFormValid(target.closest('input').checkValidity());
  };

  const handleNewsSearch = (e) => {
    e.preventDefault();

    if (isSearchFormValid) {
      onSearch(inputValue);
    } else {
      setInputValue('');
      setPlaceholderMessage('Нужно ввести ключевое слово');
      localStorage.removeItem('query');
    }
  };

  React.useEffect(() => {
    if ('query' in localStorage) {
      setInputValue(localStorage.getItem('query'));
    }
  }, []);

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
          className="search-form__input"
          minLength="2"
          maxLength="40"
          autoComplete="off"
          pattern="^[A-Za-zА-Яа-я]{2,40}$"
          value={inputValue}
          placeholder={placeholderMessage}
          onChange={handleChangeSearchForm}
          required
        />

        <button
          type="button"
          aria-label="Искать"
          className="search-form__search-button"
          onClick={handleNewsSearch}
        >
          Искать
        </button>
      </div>
    </div>
  );
}

export default SearchForm;
