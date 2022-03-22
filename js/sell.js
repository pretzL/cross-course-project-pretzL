const sellForm = document.querySelector(".sell-form");

const gameTitle = document.querySelector("#game-title");
const gameTitleError = document.querySelector("#game-title-error");

const condition = document.querySelector("#condition");
const conditionError = document.querySelector("#condition-error");

const copy = document.querySelector("#copy");
const copyError = document.querySelector("#copy-error");

const price = document.querySelector("#price");
const priceError = document.querySelector("#price-error");

const validatorContainer = document.querySelector(".validator-container");

function validateForm(sellForm) {
  sellForm.preventDefault();

  if (checkLength(gameTitle.value, 2)) {
    gameTitleError.style.display = "none";
  } else {
    gameTitleError.style.display = "block";
  }

  if (checkLength(price.value, 0)) {
    priceError.style.display = "none";
  } else {
    priceError.style.display = "block";
  }

  // Form validated message
  if (checkLength(gameTitle.value, 2) && checkLength(price.value, 0)) {
    validatorContainer.style.display = "block";
  }
}

sellForm.addEventListener("submit", validateForm);

function checkLength(value, char) {
  return value.trim().length > char;
}
