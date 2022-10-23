import {  useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import CurrentUserContext from "../../context/CurrentUserContext";
import useFormWithValidation from "../../hooks/useFormValidation";

const SearchForm = ({ handleSearchSubmit, handleShortFilms, shortMovies }) => {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const { values, handleChange } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleSearchSubmit(values.search);
  }

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem(`${currentUser.email} - movieSearch`)
    ) {
      const searchValue = localStorage.getItem(
        `${currentUser.email} - movieSearch`
      );
      values.search = searchValue;
    }
  }, [currentUser]);

  return (
    <section className="search">
      <form
        className="search__form"
        name="search"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          className="search__input"
          name="search"
          type="text"
          placeholder="Фильм"
          autoComplete="off"
          value={values.search || ""}
          onChange={handleChange}
          required
        />

        <button className="search__button" type="submit"></button>
      </form>
      <FilterCheckbox
        shortMovies={shortMovies}
        handleShortFilms={handleShortFilms}
      />
    </section>
  );
};

export default SearchForm;
