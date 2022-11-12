import { useState, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Tooltip from "../Tooltip/Tooltip";
import Preloader from "../Preloader/Preloader";
import "./App.css";

import mainApi from "../../utils/MainApi.js";

import CurrentUserContext from "../../context/CurrentUserContext";

const App = () => {
  const history = useHistory();
  const location = useLocation();
  const [isLoader, setIsLoader] = useState(false);
  const [tooltipConfig, setTooltipConfig] = useState({
    isOpen: false,
    successful: true,
    text: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [moviesList, setMoviesList] = useState([]);

  const headerVisibleLocation = ["/movies", "/saved-movies", "/profile", "/"];
  const footerVisibleLocation = ["/movies", "/saved-movies", "/"];

  function handleCloseTooltip() {
    setTooltipConfig({ ...tooltipConfig, isOpen: false });
  }

  function handleRegister({ name, email, password }) {
    setIsLoader(true);
    mainApi
      .createUser(name, email, password)
      .then((data) => {
        if (data._id) {
          handleLogin({ email, password });
        }
      })
      .catch((err) =>
        setTooltipConfig({
          isOpen: true,
          successful: false,
          text: err,
        })
      )
      .finally(() => setIsLoader(false));
  }

  function handleLogin({ email, password }) {
    setIsLoader(true);
    mainApi
      .login(email, password)
      .then((jwt) => {
        if (jwt.token) {
          localStorage.setItem("jwt", jwt.token);
          setLoggedIn(true);
          history.push("/movies");
          setTooltipConfig({
            isOpen: true,
            successful: true,
            text: "Добро пожаловать!",
          });
        }
      })
      .catch((err) =>
        setTooltipConfig({
          isOpen: true,
          successful: false,
          text: err,
        })
      )
      .finally(() => setIsLoader(false));
  }

  function handleSignOut() {
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.clear();
    history.push("/");
  }

  function handleProfile({ name, email }) {
    setIsLoader(true);
    mainApi
      .updateUser(name, email)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        setTooltipConfig({
          isOpen: true,
          successful: true,
          text: "Ваши данные обновлены!",
        });
      })
      .catch((err) =>
        setTooltipConfig({
          isOpen: true,
          successful: false,
          text: err,
        })
      )
      .finally(() => setIsLoader(false));
  }

  function handleSaveMovie(movie) {
    mainApi
      .addNewMovie(movie)
      .then((newMovie) => setMoviesList([newMovie, ...moviesList]))
      .catch((err) =>
        setTooltipConfig({
          isOpen: true,
          successful: false,
          text: err,
        })
      );
  }

  function handleDeleteMovie(movie) {
    const savedMovie = moviesList.find(
      (item) => item.movieId === movie.id || item.movieId === movie.movieId
    );
    mainApi
      .deleteMovie(savedMovie._id)
      .then(() => {
        const newMoviesList = moviesList.filter((m) => {
          if (movie.id === m.movieId || movie.movieId === m.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setMoviesList(newMoviesList);
      })
      .catch((err) =>
        setTooltipConfig({
          isOpen: true,
          successful: false,
          text: err,
        })
      );
  }

  useEffect(() => {
    const path = location.pathname;
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setIsLoader(true);
      mainApi
        .getUserInfo()
        .then((data) => {
          if (data) {
            setLoggedIn(true);
            setCurrentUser(data);
            history.push(path);
          }
        })
        .catch((err) =>
          setTooltipConfig({
            isOpen: true,
            successful: false,
            text: err,
          })
        )
        .finally(() => {
          setIsLoader(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loggedIn) {
      setIsLoader(true);
      mainApi
        .getUserInfo()
        .then((res) => setCurrentUser(res))
        .catch((err) =>
          setTooltipConfig({
            isOpen: true,
            successful: false,
            text: err,
          })
        )
        .finally(() => setIsLoader(false));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn && currentUser) {
      mainApi
        .getSavedMovies()
        .then((data) => {
          const movies = data.filter(
            (m) => m.owner === currentUser._id
          );
          setMoviesList(movies);
        })
        .catch((err) =>
          setTooltipConfig({
            isOpen: true,
            successful: false,
            text: err,
          })
        );
    }
  }, [currentUser, loggedIn]);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Route exact path={headerVisibleLocation}>
          <Header authorized={loggedIn} />
        </Route>
        <Switch>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            setIsLoader={setIsLoader}
            setTooltipConfig={setTooltipConfig}
            savedMoviesList={moviesList}
            onLikeClick={handleSaveMovie}
            onDeleteClick={handleDeleteMovie}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            savedMoviesList={moviesList}
            onDeleteClick={handleDeleteMovie}
            setTooltipConfig={setTooltipConfig}
          />
          <Route exact path="/signup">
            {!loggedIn ? (
              <Register handleRegister={handleRegister} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/signin">
            {!loggedIn ? (
              <Login handleLogin={handleLogin} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            handleProfile={handleProfile}
            handleSignOut={handleSignOut}
          />
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Route exact path={footerVisibleLocation}>
          <Footer />
        </Route>
        {isLoader && <Preloader />}
        <Tooltip status={tooltipConfig} onClose={handleCloseTooltip} />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
