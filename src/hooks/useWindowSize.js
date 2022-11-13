import { useState, useEffect } from "react";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    let timer;

    function resizeController() {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          handleResize();
        }, 1000);
      }
    }

    window.addEventListener("resize", resizeController);

    handleResize();

    return () => window.removeEventListener("resize", resizeController);
  }, []);
  return windowSize;
}

export default useWindowSize;
