import "./Hamburger.css";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";

const Hamburger = ({ isBurgerOpened, onClickBurger }) => {
  const isMobile = useMediaQuery({ query: `(max-width: 800px)` });

  const handleOnClickBurger = () => {
    console.log(2)
    onClickBurger(isBurgerOpened);
  };

  useEffect(() => {
    if (!isMobile) {
      onClickBurger(true);
    }
  }, [isMobile, onClickBurger]);
  return (
    <button
      type="button"
      className={`hamburger-button hamburger-button_${
        isBurgerOpened ? "on" : "off"
      }`}
      onClick={handleOnClickBurger}
    >
      <span></span>
    </button>
  );
};

export default Hamburger;
