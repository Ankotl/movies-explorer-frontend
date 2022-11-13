import { BACKEND_MOVIES_URL, DEFAULT_URL_IMAGE } from "./constants";

function addFieldsMovies(movies) {
  return movies.map(
    ({ image, thumbnail, country, nameEN, nameRU, ...movie }) => ({
      ...movie,
      image: !image
        ? DEFAULT_URL_IMAGE
        : `${BACKEND_MOVIES_URL}${image.formats.thumbnail.url}`,
      thumbnail: !image
        ? DEFAULT_URL_IMAGE
        : `${BACKEND_MOVIES_URL}${image.url}`,
      country: !country ? "Earth" : country,
      nameEN: !nameEN ? nameRU : nameEN,
      nameRU: nameRU,
    })
  );
}

function getShortMovies(movies) {
  return movies.filter((movie) => movie.duration < 40);
}

function filterMovies(movies, query, isShortMovies) {
  const moviesFiltered = movies.filter(({ nameEN, nameRU }) => {
    const movieRu = nameRU.toLowerCase().trim();
    const movieEn = nameEN.toLowerCase().trim();
    const userInput = query.toLowerCase().trim();
    return (
      movieRu.indexOf(userInput) !== -1 || movieEn.indexOf(userInput) !== -1
    );
  });

  if (isShortMovies) {
    return getShortMovies(moviesFiltered);
  } else {
    return moviesFiltered;
  }
}

export { addFieldsMovies, filterMovies, getShortMovies };
