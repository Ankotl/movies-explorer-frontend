import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import "./App.css";

import moviesData from "../../utils/mockdata";

const App = () => {
  const history = useHistory();
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const onClickBurger = (isBurgerOpened) => {
    console.log(1)
    setIsBurgerOpened(!isBurgerOpened);
  };

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    setMovies(moviesData);
  }, []);

  useEffect(() => {
    setSavedMovies(moviesData.filter((movie) => {
      return movie.saved
    }))
  }, []);

  return (
    <div className="app">
      <Switch>
        <Route path="/" exact>
          <Header
            themePink
            authorized={false}
            onClickBurger={onClickBurger}
            isBurgerOpened={isBurgerOpened}
          />
          <Main />
          <Footer />
        </Route>
        <Route path="/movies">
        <Header authorized onClickBurger={onClickBurger} isBurgerOpened={isBurgerOpened} />
        <Movies movies={movies} />
        <Footer />
      </Route>
      {/* <Route exact path="/saved-movies">
        <Header themeDark={true} authorized={true} onClickBurger={onClickBurger} isBurgerOpened={isBurgerOpened} />
        <SavedMovies movies={savedMovies}/>
        <Footer />
      </Route>
      <Route exact path="/signup">
        <Register />
      </Route>
      <Route exact path="/signin">
        <Login />
      </Route>
      <Route exact path="/profile">
        <Header themeDark={true} authorized={true} onClickBurger={onClickBurger} isBurgerOpened={isBurgerOpened} />
        <Profile />
      </Route>
      <Route path="*">
        <NotFound goBack={goBack} />
      </Route> */}
      </Switch>
    </div>
  );
};

export default App;
