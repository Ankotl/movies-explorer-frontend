import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import "./App.css";

import moviesData from "../../utils/mockdata";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    setMovies(moviesData);
  }, []);

  useEffect(() => {
    setSavedMovies(
      moviesData.filter((movie) => {
        return movie.saved;
      })
    );
  }, []);

  return (
    <div className="app">
      <Switch>
        <Route path="/" exact>
          <Header />
          <Main />
          <Footer />
        </Route>
        <Route path="/movies">
          <Header authorized />
          <Movies movies={movies} />
          <Footer />
        </Route>
        <Route exact path="/saved-movies">
          <Header authorized />
          <SavedMovies movies={savedMovies} />
          <Footer />
        </Route>
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route exact path="/signin">
          <Login />
        </Route>
        <Route exact path="/profile">
          <Header authorized />
          <Profile />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
