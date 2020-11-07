import React, { createRef, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import PopupInput from './PopupInput';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSending }) {
  const currentUser = useContext(CurrentUserContext);
  const checkValidity = createRef();
  const {
    values,
    handleChange,
    errors,
    isValid,
    setIsValid,
    resetForm,
  } = useFormWithValidation();

  useEffect(() => {
    setIsValid(checkValidity.current.checkValidity());
  }, [setIsValid, checkValidity]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm, isOpen]);

  return (
    <PopupWithForm
      ref={checkValidity}
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      buttonText={isSending ? 'Сохранение...' : 'Сохранить'}
    >
      <PopupInput
        value={values.name}
        changeValue={handleChange}
        className="popup__input_type_profile-name"
        name="name"
        type="text"
        placeholder="Ваше имя"
        required
        minLength="2"
        maxLength="40"
        autoComplete="off"
        validationMessage={errors.name}
      />
      <PopupInput
        value={values.about}
        changeValue={handleChange}
        className="popup__input_type_profile-status"
        name="about"
        type="text"
        placeholder="Профессия"
        required
        minLength="2"
        maxLength="200"
        autoComplete="off"
        validationMessage={errors.about}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
