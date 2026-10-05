window.addEventListener("DOMContentLoaded", (e) => {
  const body = document.body;
  const header = createHeader();
  const main = createElement("main", "main");

  body.append(header);
  body.append(main);

  renderDeck();
});

const state = {
  firstCard: null,
  isLocked: false,
};

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

  newGameBtn.addEventListener("click", renderDeck);

  header.append(newGameBtn, showResultsBtn);
  return header;
}

function openCard(card) {
  card.classList.remove("hidden");
}

function closeCard(card) {
  card.classList.add("hidden");
}

function handleCardClick(card) {
  if (state.isLocked) return;
  if (card.classList.contains("opened")) return;

  openCard(card);

  if (state.firstCard === null) {
    state.firstCard = card;
    return;
  }

  if (state.firstCard === card) return;

  const firstCard = state.firstCard;
  const secondCard = card;

  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add("opened");
    secondCard.classList.add("opened");
    state.firstCard = null;
    return;
  }

  state.isLocked = true;
  setTimeout(() => {
    closeCard(firstCard);
    closeCard(secondCard);
    state.firstCard = null;
    state.isLocked = false;
  }, 1000);
}

function createCard(number) {
  const content = createElement("div", "card__content", number);
  const card = createElement("div", "card hidden");
  card.dataset.value = number;
  card.append(content);

  card.addEventListener("click", () => handleCardClick(card));
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

function renderDeck() {
  const main = document.querySelector("main");
  main.replaceChildren();
  const deck = shuffleDeck(createDeck());

  for (let i = 0; i < deck.length; i += 1) {
    main.append(createCard(deck[i]));
  }
}
