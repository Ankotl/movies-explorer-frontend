import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const Movies = ({ movies }) => {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList movies={movies} isButtonMore/>
    </main>
  );
};

export default Movies;
