import React from 'react';
import AuthForm from './AuthForm';
import InfoTooltip from './InfoTooltip';

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
      <InfoTooltip isFail={false} isOpen={false} />
    </div>
  );
};

export default Register;
