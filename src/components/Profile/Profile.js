import "./Profile.css";
import { useState, useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

const Profile = ({ handleSignOut, handleProfile }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [lastName, setLastName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [lastEmail, setLastEmail] = useState(currentUser.email);
  const [isVisibleButton, setVisibleButton] = useState(false);

  function handleNameChange(evt) {
    const value = evt.target.value;
    setName(value);

    if (value !== lastName) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  }

  function handleEmailChange(evt) {
    const value = evt.target.value;
    setEmail(value);

    if (value !== lastEmail) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleProfile({ name, email });
    setVisibleButton(false);
    setLastName(name);
    setLastEmail(email);
  }

  return (
    <section className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <h3 className="profile__greeting">Привет, {name}!</h3>
        <div className="profile__inputs">
          <p className="profile__text">Имя</p>
          <div className="profile__area profile__area_type_name">
            <input
              className="profile__settings"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="profile__area profile__area_type_email">
            <input
              className="profile__settings"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <p className="profile__text">E-mail</p>
        </div>
        <button className="profile__button" disabled={!isVisibleButton}>
          Редактировать
        </button>
        <button className="profile__link" type="button" onClick={handleSignOut}>
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
};

export default Profile;
