import { BASE_URL } from "./constants.js";

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  async _requestResult(res) {
    const result = await res.json();
    return res.ok ? result : Promise.reject(result.message);
  }

  createUser(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then((res) => this._requestResult(res));
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => this._requestResult(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => this._requestResult(res));
  }

  updateUser(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    }).then((res) => this._requestResult(res));
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => this._requestResult(res));
  }

  addNewMovie(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
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
    }).then((res) => this._requestResult(res));
  }

  deleteMovie(data) {
    return fetch(`${this._baseUrl}/movies/${data}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => this._requestResult(res));
  }
}

const mainApi = new Api({
  baseUrl: BASE_URL,
});

export default mainApi;
