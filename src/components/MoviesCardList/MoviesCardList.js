import "./MoviesCardList.css";
import React, { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import useScreenWidth from "../../hooks/useScreenWidth";
import { DEVICE_PARAMS } from "../../utils/constants.js";
import { getSavedMovieCard } from "../../utils/utils.js";

const MoviesCardList = ({
  filteredMovies,
  savedMoviesList,
  onLikeClick,
  onDeleteClick,
}) => {
  const screenWidth = useScreenWidth();

  const { desktop, tablet, mobile } = DEVICE_PARAMS;
  const [isMount, setIsMount] = useState(true);
  const [showMovieList, setShowMovieList] = useState([]);
  const [cardsShowDetails, setCardsShowDetails] = useState({
    total: 12,
    more: 3,
  });

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/movies") {
      if (screenWidth > desktop.width) {
        setCardsShowDetails(desktop.cards);
      } else if (screenWidth <= desktop.width && screenWidth > mobile.width) {
        setCardsShowDetails(tablet.cards);
      } else {
        setCardsShowDetails(mobile.cards);
      }
      return () => setIsMount(false);
    }
  }, [screenWidth, isMount, desktop, tablet, mobile, location.pathname]);

  useEffect(() => {
    if (filteredMovies.length) {
      const res = filteredMovies.filter(
        (item, i) => i < cardsShowDetails.total
      );
      setShowMovieList(res);
    }
  }, [filteredMovies, cardsShowDetails.total]);

  function handleClickMoreMovies() {
    const start = showMovieList.length;
    const end = start + cardsShowDetails.more;
    const additional = filteredMovies.length - start;

    if (additional > 0) {
      const newCards = filteredMovies.slice(start, end);
      setShowMovieList([...showMovieList, ...newCards]);
    }
  }

  return (
    <section className="cards">
      <ul className="cards__list">
        {showMovieList.map((movie) => (
          <MoviesCard
            key={movie.id || movie._id}
            saved={getSavedMovieCard(savedMoviesList, movie)}
            onLikeClick={onLikeClick}
            onDeleteClick={onDeleteClick}
            movie={movie}
          />
        ))}
      </ul>

      {location.pathname === "/movies" &&
        showMovieList.length >= 5 &&
        showMovieList.length < filteredMovies.length && (
          <div className="cards__button-container">
            <button
              className="cards__button"
              type="button"
              name="more"
              onClick={handleClickMoreMovies}
            >
              Ещё
            </button>
          </div>
        )}
    </section>
  );
};

export default MoviesCardList;
