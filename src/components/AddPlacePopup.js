import React, { useEffect } from 'react';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import PopupInput from './PopupInput';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isSending }) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm, isOpen]);

  return (
    <PopupWithForm
      name="add-places"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      buttonText={isSending ? 'Сохранение...' : 'Сохранить'}
    >
      <PopupInput
        value={values.name}
        changeValue={handleChange}
        className="popup__input_type_places-name"
        name="name"
        type="text"
        placeholder="Название"
        required
        minLength="1"
        maxLength="30"
        autoComplete="off"
        validationMessage={errors.name}
      />
      <PopupInput
        value={values.link}
        changeValue={handleChange}
        className="popup__input_type_place-image"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required
        autoComplete="off"
        validationMessage={errors.link}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
