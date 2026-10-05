window.addEventListener("DOMContentLoaded", (e) => {
  const body = document.body;
  const header = createHeader();
  const game = createGame();
  body.append(header);
  body.append(game);
});

function createElement(tag, className, text = "") {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}

function createHeader() {
  const header = createElement("header", "header");
  const newGameBtn = createElement("button", "header__btn btn", "Start");
  const showResultsBtn = createElement("button", "header__btn btn", "Results");

  header.append(newGameBtn, showResultsBtn);
  return header;
}

function createCard(number) {
  const content = createElement("div", "card__content", number);
  const card = createElement("div", "card hidden");
  card.append(content);
  return card;
}

function createDeck() {
  const deck = [];
  for (let n = 1; n <= 8; n += 1) {
    deck.push(n, n);
  }
  return deck;
}

function shuffleDeck(deck) {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
}

function createGame() {
  const game = createElement("main", "main");
  const deck = shuffleDeck(createDeck());

  for (let i = 0; i < deck.length; i += 1) {
    game.append(createCard(deck[i]));
  }

  return game;
}
