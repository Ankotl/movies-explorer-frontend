import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

const SearchForm = () => {
  return (
    <section className="search">
      <form className="search__form" name="search">
        <input
          className="search__input"
          name="search"
          type="text"
          placeholder="Фильм"
          required
        />
        <button className="search__button" type="submit"></button>
      </form>
      <FilterCheckbox />
    </section>
  );
};

export default SearchForm;
