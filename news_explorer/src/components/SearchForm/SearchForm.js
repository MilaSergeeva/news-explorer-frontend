import "./SearchForm.css";
import React from "react";

function SearchForm() {
  return (
    <div className="header-search">
      <h1 className="header-search__title">Что творится в мире?</h1>
      <p className="header-search__text">
        Находите самые свежие статьи на любую тему и сохраняйте в своём личном
        кабинете.
      </p>
      <div className="header-search__input-fild">
        <input
          type="text"
          name="search"
          placeholder="Введите тему новости"
          className="header-search__input"
          minLength="2"
          maxLength="40"
          autoComplete="off"
          required
        />
        <button
          type="button"
          aria-label="Искать"
          className="header-search__search-button"
        >
          Искать
        </button>
      </div>
    </div>
  );
}

export default SearchForm;
