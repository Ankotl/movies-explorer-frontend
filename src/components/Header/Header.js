import { Link } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import logo from "../../images/header_logo.svg";

const Header = ({ themePink, authorized, onClickBurger, isBurgerOpened }) => {
  return (
    <header className={`header header_theme_${themePink ? "pink" : "white"}`}>
      <div className="header__container">
        <Link to="/" className="header__link">
          <img src={logo} alt="Лого" />
        </Link>
        <Navigation
          authorized={authorized}
          onClickBurger={onClickBurger}
          isBurgerOpened={isBurgerOpened}
        />
      </div>
    </header>
  );
};

export default Header;
