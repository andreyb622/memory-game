window.addEventListener("DOMContentLoaded", (e) => {
  const body = document.body;
  const header = createHeader();
  body.append(header);
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
