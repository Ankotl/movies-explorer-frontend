import "./Movies.css";
import { useState, useContext, useEffect } from "react";
import {
  addFieldsMovies,
  filterMovies,
  getShortMovies,
} from "../../utils/utils";
import moviesApi from "../../utils/MoviesApi";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import CurrentUserContext from "../../context/CurrentUserContext";

export default function Movies({
  setIsLoader,
  setTooltipConfig,
  savedMoviesList,
  onLikeClick,
  onDeleteClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const [isAllMovies, setIsAllMovies] = useState([]);

  function handleSetFilteredMovies(movies, query, isShortMovies) {
    const moviesList = filterMovies(movies, query, isShortMovies);
    if (moviesList.length === 0) {
      setTooltipConfig({
        isOpen: true,
        successful: false,
        text: "Ничего не найдено.",
      });
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
    setInitialMovies(moviesList);
    setFilteredMovies(isShortMovies ? getShortMovies(moviesList) : moviesList);
    localStorage.setItem(
      `${currentUser.email} - movies`,
      JSON.stringify(moviesList)
    );
  }

  function handleSearchSubmit(inputValue) {
    localStorage.setItem(`${currentUser.email} - movieSearch`, inputValue);
    localStorage.setItem(`${currentUser.email} - isShortMovies`, isShortMovies);

    if (isAllMovies.length === 0) {
      setIsLoader(true);
      moviesApi
        .getMovies()
        .then((movies) => {
          setIsAllMovies(movies);
          handleSetFilteredMovies(
            addFieldsMovies(movies),
            inputValue,
            isShortMovies
          );
        })
        .catch(() =>
          setTooltipConfig({
            isOpen: true,
            successful: false,
            text: "Во время запроса произошла ошибка. Подождите немного и попробуйте ещё раз.",
          })
        )
        .finally(() => setIsLoader(false));
    } else {
      handleSetFilteredMovies(
        addFieldsMovies(isAllMovies),
        inputValue,
        isShortMovies
      );
    }
  }

  function handleShortFilms() {
    setIsShortMovies(!isShortMovies);
    if (!isShortMovies) {
      setFilteredMovies(getShortMovies(initialMovies));
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem(
      `${currentUser.email} - isShortMovies`,
      !isShortMovies
    );
  }

  useEffect(() => {
    if (
      localStorage.getItem(`${currentUser.email} - isShortMovies`) === "true"
    ) {
      setIsShortMovies(true);
    } else {
      setIsShortMovies(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - movies`)) {
      const movies = JSON.parse(
        localStorage.getItem(`${currentUser.email} - movies`)
      );
      setInitialMovies(movies);
      if (
        localStorage.getItem(`${currentUser.email} - isShortMovies`) === "true"
      ) {
        setFilteredMovies(getShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    } else {
      handleSearchSubmit("");
    }
  }, [currentUser]);

  return (
    <main className="movies">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleShortFilms={handleShortFilms}
        shortMovies={isShortMovies}
      />
      {!isNotFound && (
        <MoviesCardList
          moviesList={filteredMovies}
          savedMoviesList={savedMoviesList}
          onLikeClick={onLikeClick}
          onDeleteClick={onDeleteClick}
        />
      )}
    </main>
  );
}
