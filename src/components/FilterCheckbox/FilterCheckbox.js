import React from "react";
import "./FilterCheckbox.css";

const FilterCheckbox = ({ shortMovies, handleShortFilms }) => {
  return (
    <label className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
        onChange={handleShortFilms}
        checked={shortMovies ? true : false}
      />
      <span className="filter__tumbler"></span>
      <span className="filter__text">Короткометражки</span>
    </label>
  );
};

export default FilterCheckbox;
