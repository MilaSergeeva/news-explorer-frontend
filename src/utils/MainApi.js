import Api from './Api';
import { getToken } from './token';
import { BASE_URL } from '../config';

const api = new Api({
  baseUrl: `${BASE_URL}`,
  headers: {
    authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  },
});

function buildApiClient(token) {
  return new Api({
    baseUrl: `${BASE_URL}`,
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}

export { api, buildApiClient };
