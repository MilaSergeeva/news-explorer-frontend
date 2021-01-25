import Api from './Api';

const newsApi = new Api({
  baseUrl: 'https://nomoreparties.co/news/v2',

  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default newsApi;
