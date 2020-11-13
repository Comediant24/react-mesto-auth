export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      if (res.status === 400)
        return Promise.reject('некорректно заполнено одно из полей');
      if (res.ok) {
        return res.json();
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      if (res.status === 400)
        return Promise.reject('не передано одно из полей');
      if (res.status === 401)
        return Promise.reject('пользователь с email не найден');
      if (res.ok) {
        return res.json();
      }
    })
    .then((res) => {
      if (res.token) {
        return res;
      }
    })
    .catch((err) => console.log(err));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status === 400)
        return Promise.reject('Токен не передан или передан не в том формате');
      if (res.status === 401)
        return Promise.reject('Переданный токен некорректен');
      if (res.ok) {
        return res.json();
      }
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
