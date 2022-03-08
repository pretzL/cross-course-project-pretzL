const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const username = params.get("name");

const headingOne = document.querySelector("h1");
const usernameText = document.querySelector(".username-text");

if (username === null) {
  headingOne.innerHTML = "User Profile";
  usernameText.innerHTML = "Username";
} else {
  headingOne.innerHTML = username + "`s profile";
  usernameText.innerHTML = username;
}
