import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__projects-list">
          <li className="portfolio__projects-item">
            <a
              href="https://github.com/Ankotl/how-to-learn"
              target="_blank"
              rel="noreferrer"
              className="portfolio__link"
            >
              Статичный сайт
            </a>
          </li>
          <li className="portfolio__projects-item">
            <a
              href="https://github.com/Ankotl/russian-travel"
              target="_blank"
              rel="noreferrer"
              className="portfolio__link"
            >
              Адаптивный сайт
            </a>
          </li>
          <li className="portfolio__projects-item">
            <a
              href="https://github.com/Ankotl/react-mesto-api-full"
              target="_blank"
              rel="noreferrer"
              className="portfolio__link"
            >
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Portfolio;
