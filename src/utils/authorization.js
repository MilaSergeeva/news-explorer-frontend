/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable implicit-arrow-linebreak */
// export const BASE_URL = 'https://news-exploer.herokuapp.com';
export const BASE_URL = 'http://localhost:3001/api';

export const register = (email, password, name) =>
  fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    return res.json();
  });

export const authorize = (email, password) =>
  fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    return res.json();
  });

export const getContent = (token) =>
  fetch(`${BASE_URL}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    return res.json();
  });
