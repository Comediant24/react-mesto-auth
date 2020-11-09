import React, { useEffect } from 'react';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import Input from './Input';

const AuthForm = ({
  className,
  title = 'Заголовок формы',
  buttonText = 'Сабмит формы',
  loginLink,
  onSubmit,
}) => {
  const {
    values,
    handleChange,
    errors,
    isValid,
    setIsValid,
    resetForm,
  } = useFormWithValidation();

  useEffect(() => {
    setIsValid(false);
  }, [setIsValid]);

  const handleSubmit = (e) => {
    onSubmit(e, values);
    resetForm();
  };

  return (
    <form
      className={`auth-form ${className}`}
      onSubmit={handleSubmit}
      name={className}
      action="#"
      noValidate
    >
      <h3 className="auth-form__title">{title}</h3>
      <fieldset className="auth-form__container">
        <Input
          value={values.email}
          changeValue={handleChange}
          classBlock="auth-form"
          name="email"
          type="email"
          placeholder="Email"
          required
          autoComplete="off"
          validationMessage={errors.email}
        />
        <Input
          value={values.password}
          changeValue={handleChange}
          classBlock="auth-form"
          name="password"
          type="password"
          placeholder="Пароль"
          required
          autoComplete="off"
          validationMessage={errors.password}
        />
      </fieldset>
      <button
        type="submit"
        aria-label="Отправить данные"
        className={`button auth-form__button auth-form__button_submit ${
          isValid ? '' : 'auth-form__button_submit_disabled'
        }`}
        disabled={!isValid}
      >
        {buttonText}
      </button>
      <a href="/#" className="link auth-form__is-login-link">
        {loginLink ? 'Уже зарегестрированны? Войти' : ''}
      </a>
    </form>
  );
};

export default AuthForm;