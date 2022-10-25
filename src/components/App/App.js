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
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import Preloader from "../Preloader/Preloader";
import "./App.css";

import mainApi from "../../utils/MainApi.js";

import CurrentUserContext from "../../context/CurrentUserContext";

const App = () => {
  const history = useHistory();
  const location = useLocation();
  const [isLoader, setIsLoader] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState({
    isOpen: false,
    successful: true,
    text: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [moviesList, setMoviesList] = useState([]);

  const headerEndpoints = ["/movies", "/saved-movies", "/profile", "/"];
  const footerEndpoints = ["/movies", "/saved-movies", "/"];

  function closeInfoTooltip() {
    setInfoTooltip({ ...infoTooltip, isOpen: false });
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
        setInfoTooltip({
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
          setInfoTooltip({
            isOpen: true,
            successful: true,
            text: "Добро пожаловать!",
          });
        }
      })
      .catch((err) =>
        setInfoTooltip({
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
        setInfoTooltip({
          isOpen: true,
          successful: true,
          text: "Ваши данные обновлены!",
        });
      })
      .catch((err) =>
        setInfoTooltip({
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
        setInfoTooltip({
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
        setInfoTooltip({
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
          setInfoTooltip({
            isOpen: true,
            successful: false,
            text: err,
          })
        )
        .finally(() => {
          setIsLoader(false);
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      setIsLoader(true);
      mainApi
        .getUserInfo()
        .then((res) => setCurrentUser(res))
        .catch((err) =>
          setInfoTooltip({
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
          const UserMoviesList = data.filter(
            (m) => m.owner === currentUser._id
          );
          setMoviesList(UserMoviesList);
        })
        .catch((err) =>
          setInfoTooltip({
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
        <Route exact path={headerEndpoints}>
          <Header authorized={loggedIn} />
        </Route>
        <Switch>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            setIsLoader={setIsLoader}
            setInfoTooltip={setInfoTooltip}
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
            setInfoTooltip={setInfoTooltip}
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
        <Route exact path={footerEndpoints}>
          <Footer />
        </Route>
        {isLoader && <Preloader />}
        <InfoTooltip status={infoTooltip} onClose={closeInfoTooltip} />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
