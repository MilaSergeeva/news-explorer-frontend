/* eslint-disable import/prefer-default-export */
import { Api } from './Api';

const newsApi = new Api({
  baseUrl:
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=670ce72cce9c46b28214a8e2e4e4f7da',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { newsApi };
