import { useState, useContext, useEffect } from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import CurrentUserContext from "../../context/CurrentUserContext";
import { filterMovies, filterShortMovies } from "../../utils/utils";
import "./SavedMovies.css";

const SavedMovies = ({ onDeleteClick, savedMoviesList, setIsInfoTooltip }) => {
  const currentUser = useContext(CurrentUserContext);

  const [shortMovies, setShortMovies] = useState(false);
  const [NotFound, setNotFound] = useState(false);
  const [showedMovies, setShowedMovies] = useState(savedMoviesList);
  const [filteredMovies, setFilteredMovies] = useState(showedMovies);

  function handleSearchSubmit(inputValue) {
    const moviesList = filterMovies(savedMoviesList, inputValue, shortMovies);
    if (moviesList.length === 0) {
      setNotFound(true);
      setIsInfoTooltip({
        isOpen: true,
        successful: false,
        text: "Ничего не найдено.",
      });
    } else {
      setNotFound(false);
      setFilteredMovies(moviesList);
      setShowedMovies(moviesList);
    }
  }

  function handleShortFilms() {
    if (!shortMovies) {
      setShortMovies(true);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, true);
      setShowedMovies(filterShortMovies(filteredMovies));
      filterShortMovies(filteredMovies).length === 0
        ? setNotFound(true)
        : setNotFound(false);
    } else {
      setShortMovies(false);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, false);
      filteredMovies.length === 0 ? setNotFound(true) : setNotFound(false);
      setShowedMovies(filteredMovies);
    }
  }

  useEffect(() => {
    if (
      localStorage.getItem(`${currentUser.email} - shortSavedMovies`) === "true"
    ) {
      setShortMovies(true);
      setShowedMovies(filterShortMovies(savedMoviesList));
    } else {
      setShortMovies(false);
      setShowedMovies(savedMoviesList);
    }
  }, [savedMoviesList, currentUser]);

  useEffect(() => {
    setFilteredMovies(savedMoviesList);
    savedMoviesList.length !== 0 ? setNotFound(false) : setNotFound(true);
  }, [savedMoviesList]);

  return (
    <main className="movies">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleShortFilms={handleShortFilms}
        shortMovies={shortMovies}
      />
      {!NotFound && (
        <MoviesCardList
          filteredMovies={showedMovies}
          savedMoviesList={savedMoviesList}
          onDeleteClick={onDeleteClick}
        />
      )}
    </main>
  );
};

export default SavedMovies;
