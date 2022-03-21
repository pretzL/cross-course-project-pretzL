const cors = "https://noroffcors.herokuapp.com/";

const baseURL = "https://api.rawg.io/api/games";

const key = "?key=35f9fd70b7b54c25bfa1662ebdeaff60";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const search = params.get("search");

const searchContainer = document.querySelector(".search-content");

async function getSearch() {
  try {
    searchContainer.innerHTML = "";
    errorContainer.innerHTML = "";

    const url = cors + baseURL + key + "&search=" + search;

    const response = await fetch(url);
    const results = await response.json();

    const games = results.results;

    for (let i = 8; i < games.length; i++) {
      if (games.length === 0) {
        errorContainer.innerHTML = errorMessage("We don't recognize that game");
        errorContainer.style.display = "block";
      }
      if (games.length < 1) {
        errorContainer.innerHTML = errorMessage("Please be more specific");
        errorContainer.style.display = "block";
      }
      if (games[i].rating === 0) {
        continue;
      }
      searchContainer.innerHTML += `<a href="/game-profile.html?id=${games[i].id}" class="card">
          <img src="${games[i].background_image}" class="card-image"/>
            <h3>${games[i].name}</h3>
            <p>Rating: ${games[i].rating}</p>
            <p>Released: ${games[i].released}</p>
            </a>`;
    }
  } catch (error) {
    console.log(error);
    errorContainer.innerHTML = errorMessage("An error occurred when calling the API, error: " + error);
  }
}

getSearch();
