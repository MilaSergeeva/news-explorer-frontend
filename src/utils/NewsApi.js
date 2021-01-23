/* eslint-disable import/prefer-default-export */
import { Api } from './Api';

// https://newsapi.org/v2/everything?apiKey=670ce72cce9c46b28214a8e2e4e4f7da&q=oslo&from=2021-01-15&to=2021-01-22
const newsApi = new Api({
  baseUrl: 'https://nomoreparties.co/news/v2',

  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export { newsApi };
