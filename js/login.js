const form = document.querySelector(".contact-form");

const username = document.querySelector("#username");
const usernameError = document.querySelector("#username-error");

const password = document.querySelector("#password");
const passwordError = document.querySelector("#password-error");

const validatorContainer = document.querySelector(".validator-container");

function validateLogin(form) {
  form.preventDefault();

  if (checkLength(username.value, 2)) {
    usernameError.style.display = "none";
  } else {
    usernameError.style.display = "block";
  }

  if (checkLength(password.value, 5)) {
    passwordError.style.display = "none";
  } else {
    passwordError.style.display = "block";
  }

  // Validation Message Checker
  if (checkLength(username.value, 3) && checkLength(password.value, 3)) {
    validatorContainer.style.display = "block";
  }
}

form.addEventListener("submit", validateLogin);

function checkLength(value, char) {
  return value.trim().length > char;
}