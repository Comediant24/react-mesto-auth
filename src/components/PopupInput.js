import React from 'react';

const PopupInput = ({
  changeValue,
  className,
  name,
  value,
  validationMessage,
  ...rest
}) => {
  function handleInputChange(e) {
    changeValue(e);
  }

  return (
    <>
      <input
        {...rest}
        className={`popup__input ${className}`}
        name={name}
        onChange={handleInputChange}
        value={value || ''}
      />
      <span className="popup__error popup__error_visible">
        {validationMessage || ''}
      </span>
    </>
  );
};

export default PopupInput;
