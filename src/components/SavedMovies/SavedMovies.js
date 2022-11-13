import { useState, useContext, useEffect } from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import CurrentUserContext from "../../context/CurrentUserContext";
import { getShortMovies, filterMovies } from "../../utils/utils";
import "./SavedMovies.css";

const SavedMovies = ({ onDeleteClick, savedMoviesList, setTooltipConfig }) => {
  const currentUser = useContext(CurrentUserContext);

  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [showedMovies, setShowedMovies] = useState(savedMoviesList);
  const [filteredMovies, setFilteredMovies] = useState(showedMovies);

  function handleSearchSubmit(query) {
    const moviesList = filterMovies(savedMoviesList, query, isShortMovies);
    if (moviesList.length === 0) {
      setIsNotFound(true);
      setTooltipConfig({
        isOpen: true,
        successful: false,
        text: "Ничего не найдено.",
      });
    } else {
      setIsNotFound(false);
      setFilteredMovies(moviesList);
      setShowedMovies(moviesList);
    }
  }

  function handleShortFilms() {
    if (!isShortMovies) {
      setIsShortMovies(true);
      localStorage.setItem(`${currentUser.email} - isShortSavedMovies`, true);
      setShowedMovies(getShortMovies(filteredMovies));
      getShortMovies(filteredMovies).length === 0
        ? setIsNotFound(true)
        : setIsNotFound(false);
    } else {
      setIsShortMovies(false);
      localStorage.setItem(`${currentUser.email} - isShortSavedMovies`, false);
      filteredMovies.length === 0 ? setIsNotFound(true) : setIsNotFound(false);
      setShowedMovies(filteredMovies);
    }
  }

  useEffect(() => {
    if (
      localStorage.getItem(`${currentUser.email} - isShortSavedMovies`) === "true"
    ) {
      setIsShortMovies(true);
      setShowedMovies(getShortMovies(savedMoviesList));
    } else {
      setIsShortMovies(false);
      setShowedMovies(savedMoviesList);
    }
  }, [savedMoviesList, currentUser]);

  useEffect(() => {
    setFilteredMovies(savedMoviesList);
    savedMoviesList.length !== 0 ? setIsNotFound(false) : setIsNotFound(true);
  }, [savedMoviesList]);

  return (
    <main className="movies">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleShortFilms={handleShortFilms}
        shortMovies={isShortMovies}
      />
      {!isNotFound && (
        <MoviesCardList
          moviesList={showedMovies}
          savedMoviesList={savedMoviesList}
          onDeleteClick={onDeleteClick}
        />
      )}
    </main>
  );
};

export default SavedMovies;
