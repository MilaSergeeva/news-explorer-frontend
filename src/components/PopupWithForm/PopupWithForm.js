import './PopupWithForm.css';
import React from 'react';

const PopupWithForm = (props) => (
  <div
    className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'} `}
  >
    <div className="popup__container" onClick={props.onClick}>
      <button
        type="button"
        aria-label="Закрыть"
        className="popup__close"
        onClick={props.onClose}
      ></button>
      <div className="popup__content">
        <form
          method="POST"
          name="user-info"
          className="popup__form"
          onSubmit={props.onSubmit}
          noValidate
          disabled={props.isSubmitting}
        >
          <h3 className="popup__title">{props.title}</h3>
          {props.children}
          <span className="popup__error popup__error_position">
            {props.errorMassageOnSubmit || ''}
          </span>
          <button
            type="submit"
            className={`popup__btn-save ${
              props.isValid && props.isSubmitting !== true ? 'active-btn' : ''
            }`}
            data-submitting-label="Сохраняется..."
            disabled={props.isValid !== true || props.isSubmitting}
          >
            {props.savebtn}
          </button>
          <p className="popup__redirect">
            или&nbsp;
            <span className="popup__redirect-to" onClick={props.onRedirect}>
              {props.redirectTo}
            </span>
          </p>
        </form>
      </div>
    </div>
  </div>
);

export default PopupWithForm;
