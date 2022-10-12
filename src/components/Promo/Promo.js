import React from "react";
import logo from "../../images/text_landing.svg";
import './Promo.css'

const Promo = () => {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <img src={logo} alt="" className="promo__logo" />
      </div>
    </section>
  );
};

export default Promo;
