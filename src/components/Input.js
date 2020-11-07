import React from 'react';

const Input = ({
  changeValue,
  classBlock,
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
        className={`input ${classBlock}__input ${classBlock}__input_type_${name}`}
        name={name}
        onChange={handleInputChange}
        value={value || ''}
      />
      <span className={`input__error ${classBlock}__error`}>
        {validationMessage || ''}
      </span>
    </>
  );
};

export default Input;
