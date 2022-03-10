const cors = "https://noroffcors.herokuapp.com/";

const baseURL = "https://api.rawg.io/api/games";

const key = "?key=35f9fd70b7b54c25bfa1662ebdeaff60";

const page_size = "&page_size=20";

let orderBy = "";

const gamesContainer = document.querySelector(".all-games-content");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const parameter = params.get("parameter");

const headingOne = document.querySelector("h1");

const today = new Date().toISOString().split("T")[0];

if (parameter === "new") {
  orderBy = `&dates=2022-01-01,${today}&ordering=-released`;
  headingOne.innerHTML = "New Releases";
}

if (parameter === "top") {
  orderBy = "&ordering=-rating";
  headingOne.innerHTML = "Top Games";
}

async function getFilteredGames() {
  try {
    const url = cors + baseURL + key + page_size + orderBy;
    const response = await fetch(url);
    const results = await response.json();

    const games = results.results;
    console.log(games);
    gamesContainer.innerHTML = "";

    for (let i = 0; i < games.length; i++) {
      if (games[i].released === null) {
        continue;
      }

      gamesContainer.innerHTML += `<a href="/game-profile.html?id=${games[i].id}" class="card">
          <img src="${games[i].background_image}" class="card-image" alt="${games[i].name}"/>
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

getFilteredGames();
