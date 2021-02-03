import './InfoTooltip.css';
import React from 'react';

function InfoTooltip({ success, isOpen, onClose, onClick, onRedirect }) {
  return (
    <div className={`popup popup-info-tools ${isOpen && 'popup_opened'}`}>
      <div className="info-tools">
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close"
          onClick={onClose}
        ></button>
        {success === true ? (
          <div className="popup__container" onClick={onClick}>
            <h3 className="popup__title popup__title_position">
              User registered successfully!
              {/* Пользователь успешно зарегистрирован! */}
            </h3>
            <span
              className="popup__redirect-to popup__redirect-to_font-size"
              onClick={onRedirect}
            >
              Login
            </span>
          </div>
        ) : (
          <div className="popup__container" onClick={onClick}>
            <h3 className="popup__title popup__title_position">
              Something went wrong! Please try again.
              {/* Что-то пошло не так! Попробуйте еще раз. */}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoTooltip;
