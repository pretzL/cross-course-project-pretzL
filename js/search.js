const form = document.querySelector(".searchbar-pos");

const input = document.querySelector("#search");

function validateForm(form) {
  form.preventDefault();

  location.href = "/search.html?search=" + input.value;
}

form.addEventListener("submit", validateForm);
