import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <Link to="./" className="header__link">
        <img src={logo} alt="Логотип сайта" className="header__logo" />
      </Link>
      <ul className="header__auth-list">
        <li className="header__auth-item">
          <Link
            to="./sign-up"
            className="link header__link header__link_sign-up"
          >
            Регистрация
          </Link>
        </li>
        <li className="header__auth-item">
          <Link
            to="./sign-in"
            className="link header__link header__link_sign-in"
          >
            Вход
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
