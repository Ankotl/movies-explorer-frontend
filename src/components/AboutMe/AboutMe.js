import "./AboutMe.css";
import avatar from "../../images/Avatar.jpg";

const AboutMe = () => {
  return (
    <section className="about-me">
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__bio-container">
          <div className="about-me__bio">
            <h3 className="about-me__name">Антон</h3>
            <p className="about-me__age">Фронтенд-разработчик, 33 года</p>
            <p className="about-me__text">
              Я живу в Казани, закончил факультет Современных технологии и
              Автомобили в ИжГТУ. У меня есть жена и дети. Я люблю слушать
              музыку, а ещё увлекаюсь бегом. С 2020 года начал изучать
              программирование. Во время прохождения курса по веб-разработке,
              прошёл стажировку в IT компании и продолжаю там работать.
            </p>
            <ul className="about-me__socials">
              <li>
                <a
                  href="https://github.com/Ankotl"
                  target="_blank"
                  rel="noreferrer"
                  className="about-me__social-link"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
          <img
            className="about-me__avatar"
            src={avatar}
            alt="фотография разработчика приложения"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
