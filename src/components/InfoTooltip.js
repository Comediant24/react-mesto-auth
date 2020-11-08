import React from 'react';
import success from '../images/success.svg';
import fail from '../images/fail.svg';

const InfoTooltip = ({ isOpen, onClose, isFail }) => {
  return (
    <section
      className={`infotooltip popup popup_infotooltip ${
        isOpen ? 'popup_opened' : ''
      }`}
    >
      <div
        onClick={onClose}
        className="popup__overlay popup__overlay_infotooltip"
      ></div>
      <div className="infotooltip__container">
        <img
          src={isFail ? fail : success}
          alt={isFail ? 'Ошибка' : 'Успешная регистрация'}
          className={`infotooltip__image ${
            isFail ? 'infotooltip__image_fail' : 'infotooltip__image_success'
          }`}
        ></img>
        <h3 className="infotooltip__title">
          {isFail
            ? 'Что-то пошло не так! Попробуйте ещё раз.'
            : 'Вы успешно зарегистрировались!'}
        </h3>
        <button
          className="button popup__close-button popup__close-button_infotooltip"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
};

export default InfoTooltip;
