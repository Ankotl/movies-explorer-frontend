import "./MoviesCard.css";
import React from "react";
import { useLocation } from "react-router-dom";

const getTime = (time) => {
  const h = Math.floor(time / 60);
  const m = Math.floor(time % 60);

  return `${h ? `${h}h ` : ""}${m ? `${m}m ` : ""}`;
};

const MoviesCard = ({ movie, saved, onLikeClick, onDeleteClick }) => {
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";

  function handleLikeClick() {
    onLikeClick(movie);
  }

  function handleDeleteClick() {
    onDeleteClick(movie);
  }

  return (
    <li className={`card ${isSavedMovies && "card_active_hover"}`}>
      <a target="_blank" rel="noreferrer" href={movie.trailerLink}>
        <img
          src={movie.image}
          alt={movie.nameRU}
          title={`Описание: ${movie.description} \n\nСнято: ${movie.country} ${movie.year}г.`}
          className="card__image"
        ></img>
      </a>
      <div className="card__element">
        <p className="card__title">{movie.nameRU}</p>
        <div className="card__buttons">
          {isSavedMovies ? (
            <button
              type="button"
              className="card__button card__button_delete"
              onClick={handleDeleteClick}
              aria-label="Удалить фильм из сохранённых"
              title="Удалить фильм из сохранённых"
            />
          ) : (
            <button
              type="button"
              className={`card__button card__button${
                saved ? "_active" : "_inactive"
              }`}
              onClick={saved ? handleDeleteClick : handleLikeClick}
              aria-label={`${
                saved ? "Удалить фильм из сохранённых" : "Сохранить фильм"
              }`}
              title={`${
                saved ? "Удалить фильм из сохранённых" : "Сохранить фильм"
              }`}
            />
          )}
        </div>
      </div>
      <p className="card__duration">{getTime(movie.duration)}</p>
    </li>
  );
};

export default MoviesCard;
