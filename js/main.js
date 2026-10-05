window.addEventListener("DOMContentLoaded", (e) => {
  const body = document.body;
  const header = createHeader();
  const main = createElement("main", "main");
  const winDialog = createWinDialog();

  body.append(header);
  body.append(main);
  body.append(winDialog);
  renderDeck();
});

const state = {
  firstCard: null,
  isLocked: false,
  stepsCount: 0,
  openedCouplesCount: 0,
};

let winDialog = null;

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
  const couplesContainer = createElement("div", "header__couples-container");
  const currentOpenedCouples = createElement(
    "span",
    "header__opened-couples",
    "0",
  );
  const totalCouples = createElement("span", "header__total-couples", "/8");

  const stepsContainer = createElement("div", "header__steps-container");
  const currentSteps = createElement("span", "header__steps-count", "0");
  const stepsText = createElement("span", "header__steps-text", "moves: ");
  stepsContainer.append(stepsText, currentSteps);

  couplesContainer.append(currentOpenedCouples, totalCouples);

  newGameBtn.addEventListener("click", renderDeck);

  header.append(newGameBtn, showResultsBtn, couplesContainer, stepsContainer);
  return header;
}

function openCard(card) {
  card.classList.remove("hidden");
}

function closeCard(card) {
  card.classList.add("hidden");
}

function updateCurrentOpenedCouples() {
  const currentOpenedCouples = document.querySelector(
    ".header__opened-couples",
  );

  currentOpenedCouples.textContent = state.openedCouplesCount;
}

function handleCardClick(card) {
  if (state.isLocked) return;
  if (card.classList.contains("opened")) return;
  if (card.classList.contains("hidden")) return;

  openCard(card);

  if (state.firstCard === null) {
    state.firstCard = card;

    return;
  }

  if (state.firstCard === card) return;

  const firstCard = state.firstCard;
  const secondCard = card;
  state.stepsCount += 1;
  updateStepsCount();

  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add("opened");
    secondCard.classList.add("opened");

    state.firstCard = null;
    state.openedCouplesCount += 1;
    updateCurrentOpenedCouples();
    if (state.openedCouplesCount === 8) {
      winDialog.showModal();
    }
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
  resetState();
}

function resetState() {
  state.firstCard = null;
  state.isLocked = false;
  state.stepsCount = 0;
  state.openedCouplesCount = 0;
  updateCurrentOpenedCouples();
  updateStepsCount();
}

function createWinDialog() {
  winDialog = document.createElement("dialog");
  winDialog.className = "win-dialog";

  const wrapper = createElement("div", "win-dialog__wrapper");

  const title = createElement("h2", "dialog__title", "You win!");
  const text = createElement("p", "dialog__text");
  const closeBtn = createElement("button", "btn", "start new game");

  closeBtn.addEventListener("click", () => {
    winDialog.close();
    renderDeck();
  });

  wrapper.append(title, text, closeBtn);
  winDialog.append(wrapper);
  return winDialog;
}

function updateStepsCount() {
  const currentSteps = document.querySelector(".header__steps-count");
  currentSteps.textContent = state.stepsCount;
  const stepsCount = document.querySelector(".dialog__text");
  stepsCount.textContent = `You found all pairs in ${state.stepsCount} moves`;
}
