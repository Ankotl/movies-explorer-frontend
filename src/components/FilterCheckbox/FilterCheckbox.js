import React from "react";
import "./FilterCheckbox.css";

const FilterCheckbox = () => {
  return (
    <label className="filter">
      <input className="filter__checkbox" type="checkbox" />
      <span className="filter__tumbler"></span>
      <span className="filter__text">Короткометражки</span>
    </label>
  );
};

export default FilterCheckbox;
