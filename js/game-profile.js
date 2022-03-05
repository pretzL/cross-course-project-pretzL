const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

// if the id is null, then redirect to the home page
if (id === null) {
  location.href = "/";
}

const key = "?key=35f9fd70b7b54c25bfa1662ebdeaff60";
const detailsURL = "https://api.rawg.io/api/games/" + id + key;

const detailContainer = document.querySelector(".details");
const idContainer = document.querySelector(".id");
const pageTitle = document.querySelector("title");
const headingOne = document.querySelector("h1");

async function fetchSingleGame() {
  try {
    const response = await fetch(detailsURL);
    const singleResult = await response.json();
    console.log(singleResult);

    pageTitle.innerHTML = `${singleResult.name}`;
    headingOne.innerHTML = `${singleResult.name}`;
  } catch (error) {
    console.log(error);
    errorContainer.innerHTML = errorMessage("An error occurred when calling the API, error: " + error);
  }
}

fetchSingleGame();
