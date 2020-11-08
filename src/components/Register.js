import React from 'react';
import AuthForm from './AuthForm';

const Register = () => {
  const handleSubmit = (e, registerForm) => {
    e.preventDefault();
    console.log(registerForm);
  };

  return (
    <div>
      <AuthForm
        className="register"
        title="Регистрация"
        buttonText="Зарегистрироваться"
        loginLink={true}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Register;
