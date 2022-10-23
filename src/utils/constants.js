const BASE_URL = "http://api.akotlyakov.kino.nomoredomains.club";
const MOVIES_URL = "https://api.nomoreparties.co/beatfilm-movies";
const SHORT_MOVIES_DURATION = 40;
const DEVICE_PARAMS = {
  desktop: {
    width: 1000,
    cards: {
      total: 12,
      more: 3,
    },
  },
  tablet: {
    width: 900,
    cards: {
      total: 8,
      more: 2,
    },
  },
  mobile: {
    width: 600,
    cards: {
      total: 4,
      more: 2,
    },
  },
};

export { BASE_URL, MOVIES_URL, SHORT_MOVIES_DURATION, DEVICE_PARAMS };
