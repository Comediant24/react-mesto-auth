import React from 'react';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import Input from './Input';

const Signup = () => {
  const {
    values,
    handleChange,
    errors,
    isValid,
    setIsValid,
    resetForm,
  } = useFormWithValidation();

  return (
    <form className="auth-form">
      <h3 className="auth-form__title">Регистрация</h3>
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
          minLength="5"
          maxLength="40"
          autoComplete="off"
          validationMessage={errors.password}
        />
      </fieldset>
      <button className="button auth-form__button">Зарегистрироваться</button>
      <a href="/#" className="link auth-form__is-login-link">
        Уже зарегестрированны? Войти
      </a>
    </form>
  );
};

export default Signup;
