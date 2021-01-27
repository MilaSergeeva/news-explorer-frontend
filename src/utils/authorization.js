import { BASE_URL } from '../config';

export const register = (email, password, name) =>
  fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }

      return res.json();
    })
    .catch((err) => {
      console.log(err, `Ошибкa авторизации на signup`);

      throw new Error(err);
    });

export const authorize = (email, password) =>
  fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }

      return res.json();
    })
    .catch((err) => {
      console.log(err, `Ошибкa авторизации на signin`);

      throw new Error(err);
    });

export const getContent = (token) =>
  fetch(`${BASE_URL}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }

      return res.json();
    })
    .catch((err) => {
      console.log(err, `Ошибкa запроса контента`);

      throw new Error(err);
    });
