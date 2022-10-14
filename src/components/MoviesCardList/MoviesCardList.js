import "./MoviesCardList.css";
import React, { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

const MoviesCardList = ({ movies, isButtonMore }) => {
  const [isLoading, setLoading] = useState(false);

  const handlePreloader = () => {
    setLoading(true);
  };

  return (
    <section className="cards">
      <ul className="cards__list">
        {movies.map((movie) => (
          <MoviesCard key={movie._id} card={movie} />
        ))}
      </ul>

      {isLoading ? (
        <Preloader />
      ) : (
        isButtonMore && (
          <div className="cards__button-container">
            <button
              className="cards__button"
              type="button"
              name="more"
              onClick={handlePreloader}
            >
              Ещё
            </button>
          </div>
        )
      )}
    </section>
  );
};

export default MoviesCardList;
