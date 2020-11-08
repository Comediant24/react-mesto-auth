import React from 'react';
import AuthForm from './AuthForm';

const Login = () => {
  const handleSubmit = (e, registerForm) => {
    e.preventDefault();
    console.log(registerForm);
  };

  return (
    <div>
      <AuthForm
        className="login"
        title="Вход"
        buttonText="Войти"
        loginLink={false}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Login;
