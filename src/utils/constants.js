const BACKEND_MAIN_URL = "https://api.akotlyakov.kino.nomorepartiesxyz.ru";
const BACKEND_MOVIES_URL = "https://api.nomoreparties.co";

const ENUM_CARDLIST = {
  desktopCards: {
    cards: 12,
    amountAdd: 3,
  },
  tabletCards: {
    cards: 8,
    amountAdd: 2,
  },
  mobileCards: {
    cards: 4,
    amountAdd: 2,
  },
};

const ENUM_SCREEN_WIDTH = {
  desktopWidth: 1000,
  tabletWidth: 900,
  mobileWidth: 600,
};

const DEFAULT_URL_IMAGE =
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGZpbG18ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";

export {
  BACKEND_MAIN_URL,
  BACKEND_MOVIES_URL,
  ENUM_CARDLIST,
  ENUM_SCREEN_WIDTH,
  DEFAULT_URL_IMAGE,
};
