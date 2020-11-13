import React from 'react';
import { Link, Route } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ loggedIn, userData, onClick }) {
  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img src={logo} alt="Логотип сайта" className="header__logo" />
      </Link>
      <ul className="header__auth-list">
        {loggedIn ? (
          <>
            <li className="header__auth-item">{userData.email}</li>
            <li className="header__auth-item">
              <button
                onClick={onClick}
                className="link header__link button header__button header__button_signOut"
              >
                Выход
              </button>
            </li>
          </>
        ) : (
          <>
            <Route path="/sign-in">
              <li className="header__auth-item">
                <Link
                  to="/sign-up"
                  className="link header__link header__link_sign-up"
                >
                  Регистрация
                </Link>
              </li>
            </Route>
            <Route path="/sign-up">
              <li className="header__auth-item">
                <Link
                  to="/sign-in"
                  className="link header__link header__link_sign-in"
                >
                  Вход
                </Link>
              </li>
            </Route>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
