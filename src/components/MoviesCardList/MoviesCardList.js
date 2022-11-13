import "./MoviesCardList.css";
import React, { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import { ENUM_CARDLIST, ENUM_SCREEN_WIDTH } from "../../utils/constants.js";

function getIsSavedMovie(arr, movie) {
  return arr.find((item) => {
    return item.movieId === (movie.id || movie.movieId);
  });
}

const MoviesCardList = ({
  moviesList,
  savedMoviesList,
  onLikeClick,
  onDeleteClick,
}) => {
  const { width: screenWidth } = useWindowSize();

  const { desktopWidth, mobileWidth } = ENUM_SCREEN_WIDTH;
  const { desktopCards, tabletCards, mobileCards } = ENUM_CARDLIST;
  const [isMount, setIsMount] = useState(true);
  const [showMovieList, setShowMovieList] = useState([]);
  const [displayConfigList, setDisplayConfigList] = useState({
    cards: 12,
    amountAdd: 3,
  });

  const location = useLocation();
  const isAllMoviesList = location.pathname === "/movies";

  useEffect(() => {
    if (isAllMoviesList) {
      if (screenWidth > desktopWidth) {
        setDisplayConfigList(desktopCards);
      } else if (screenWidth <= desktopWidth && screenWidth > mobileWidth) {
        setDisplayConfigList(tabletCards);
      } else {
        setDisplayConfigList(mobileCards);
      }
      return () => setIsMount(false);
    }
  }, [
    desktopWidth,
    desktopCards,
    isAllMoviesList,
    mobileWidth,
    isMount,
    mobileCards,
    screenWidth,
    tabletCards,
  ]);

  useEffect(() => {
    if (moviesList.length) {
      const res = moviesList.filter(
        (item, i) => i < displayConfigList.cards
      );
      setShowMovieList(res);
    }
  }, [moviesList, displayConfigList.cards]);

  function handleClickMoreMovies() {
    const start = showMovieList.length;
    const end = start + displayConfigList.amountAdd;
    const additional = moviesList.length - start;

    if (additional > 0) {
      const newCards = moviesList.slice(start, end);
      setShowMovieList([...showMovieList, ...newCards]);
    }
  }

  const isVisibleMoreButton =
    isAllMoviesList &&
    showMovieList.length >= 5 &&
    showMovieList.length < moviesList.length;

  return (
    <section className="cards">
      <ul className="cards__list">
        {showMovieList.map((movie) => (
          <MoviesCard
            key={movie.id || movie._id}
            saved={getIsSavedMovie(savedMoviesList, movie)}
            onLikeClick={onLikeClick}
            onDeleteClick={onDeleteClick}
            movie={movie}
          />
        ))}
      </ul>

      {isVisibleMoreButton && (
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
