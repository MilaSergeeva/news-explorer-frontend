/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-promise-reject-errors */
import qs from 'querystring';

class Api {
  constructor({ baseUrl, headers }) {
    // options
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  makeRequest(endpoint, httpMethod, payload) {
    let url = `${this.baseUrl}/${endpoint}`;

    const options = {
      method: `${httpMethod}`,
      headers: this.headers,
    };

    if (
      payload !== undefined
      && ['POST', 'PUT', 'PATCH'].includes(httpMethod)
    ) {
      options.body = JSON.stringify(payload);
    } else if (payload !== undefined) {
      url = `${url}?${qs.encode(payload)}`;
    }

    return fetch(url, options).then((res) => {
      if (res.ok) {
        // status code check
        return res.json(); // process response
      }

      // server respond with error 4xx
      if (res.status >= 400 && res.status < 500) {
        return res
          .json()
          .then((body) => Promise.reject(`Что-то пошло не так: ${body.message}`));
      }

      // server didn't reply 5xx
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }

  findNews() {
    const endpoint = '/';
    const httpMethod = 'GET';

    return this.makeRequest(endpoint, httpMethod);
  }

  getSavedNews() {
    const endpoint = 'articles';
    const httpMethod = 'GET';

    return this.makeRequest(endpoint, httpMethod);
  }

  saveNews(newsPayload) {
    const endpoint = 'articles';
    const httpMethod = 'POST';

    return this.makeRequest(endpoint, httpMethod, newsPayload);
  }

  changeSaveNewsStatus(newsId, isSaved) {
    if (!isSaved) {
      return this.likeCard(newsId);
    }
    return this.deleteLikeCard(newsId);
  }

  deleteSavedNews(newsId) {
    const endpoint = `articles/${newsId}`;
    const httpMethod = 'DELETE';

    return this.makeRequest(endpoint, httpMethod);
  }

  getUserInfo() {
    const endpoint = 'users/me';
    const httpMethod = 'GET';

    return this.makeRequest(endpoint, httpMethod);
  }
}

export { Api };
