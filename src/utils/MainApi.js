import { Api } from './Api';
import { getToken } from './token';

const api = new Api({
  // baseUrl: 'https://news-exploer.herokuapp.com/api',
  baseUrl: 'http://localhost:3000/api',
  headers: {
    authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  },
});

function buildApiClient(token) {
  return new Api({
    // baseUrl: 'https://news-exploer.herokuapp.com/api',
    baseUrl: 'http://localhost:3000/api',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}

export { api, buildApiClient };
