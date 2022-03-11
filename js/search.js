const form = document.querySelector(".searchbar-pos");
const input = document.querySelector("#search");

const mobileForm = document.querySelector(".mobile-searchbar");
const mobileInput = document.querySelector("#mobile-search");

function validateForm(form) {
  form.preventDefault();

  location.href = "/search.html?search=" + input.value;
}

form.addEventListener("submit", validateForm);

function validateMobileForm(mobileForm) {
  mobileForm.preventDefault();

  location.href = "/search.html?search=" + mobileInput.value;
}

mobileForm.addEventListener("submit", validateMobileForm);
