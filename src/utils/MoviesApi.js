import { BACKEND_MOVIES_URL } from "./constants";

class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  }

  getMovies() {
    return fetch(`${this._baseUrl}`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
}

const moviesApi = new MoviesApi({
  baseUrl: `${BACKEND_MOVIES_URL}/beatfilm-movies`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;
