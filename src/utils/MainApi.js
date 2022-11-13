import { BACKEND_MAIN_URL } from "./constants.js";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.message);
    }
  }

  _getHeaders() {
    const jwt = localStorage.getItem("jwt");
    return {
      Authorization: `Bearer ${jwt}`,
      ...this._headers,
    };
  }

  createUser(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then((res) => this._checkResponse(res));
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({ email, password }),
    }).then((res) => this._checkResponse(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  updateUser(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ name, email }),
    }).then((res) => this._checkResponse(res));
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._getHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  addNewMovie(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteMovie(data) {
    return fetch(`${this._baseUrl}/movies/${data}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then((res) => this._checkResponse(res));
  }
}

const mainApi = new Api({
  baseUrl: BACKEND_MAIN_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
