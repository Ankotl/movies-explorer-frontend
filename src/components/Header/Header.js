import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/header_logo.svg";
import NavigationAuth from "../NavigationAuth/NavigationAuth";
import Navigation from "../Navigation/Navigation";

const Header = ({ authorized }) => {
  return (
    <header className={`header ${!authorized ? "header_type_auth" : ""} `}>
      <Link to="/" className="header__link">
        <img className="header__logo" src={logo} alt="Логотип приложения"></img>
      </Link>
      {!authorized && <NavigationAuth />}
      {authorized && <Navigation />}
    </header>
  );
};

export default Header;
