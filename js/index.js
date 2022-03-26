import { getExistingFavorites } from "./components/favoriteFunctions.js";

const URL = "https://api.rawg.io/api/games?key=35f9fd70b7b54c25bfa1662ebdeaff60";

const comingSoonContainer = document.querySelector(".content-coming-soon");
const hotContainer = document.querySelector(".content-hot");
const marketplaceContainer = document.querySelector(".content-marketplace");

async function getGames() {
  try {
    const response = await fetch(URL);
    const results = await response.json();

    const games = results.results;

    hotContainer.innerHTML = "";

    for (let i = 0; i < games.length; i++) {
      if (i === 4) {
        break;
      }

      hotContainer.innerHTML += `<div class="card">
      <a href="/game-profile.html?id=${games[i].id}">
        <img src="${games[i].background_image}" class="card-image" alt="${games[i].name}"/>
        <h3>${games[i].name}</h3>
        <p>Rating: ${games[i].rating}</p>
        <p>Released: ${games[i].released}</p>
      </a>
        <span class="material-icons md-24 favorite-icon favorite-icon-small" data-id="${games[i].id}"> favorite_border </span>
      </div>`;
    }

    marketplaceContainer.innerHTML = "";

    for (let i = 4; i < games.length; i++) {
      if (i === 8) {
        break;
      }

      marketplaceContainer.innerHTML += `<div class="card">
      <a href="/game-profile.html?id=${games[i].id}">
        <img src="${games[i].background_image}" class="card-image" alt="${games[i].name}"/>
        <h3>${games[i].name}</h3>
        <p>Rating: ${games[i].rating}</p>
        <p>Released: ${games[i].released}</p>
      </a>
        <span class="material-icons md-24 favorite-icon favorite-icon-small" data-id="${games[i].id}"> favorite_border </span>
      </div>`;
    }

    comingSoonContainer.innerHTML = "";

    for (let i = 8; i < games.length; i++) {
      if (i === 12) {
        break;
      }

      comingSoonContainer.innerHTML += `<div class="card">
      <a href="/game-profile.html?id=${games[i].id}">
        <img src="${games[i].background_image}" class="card-image" alt="${games[i].name}"/>
        <h3>${games[i].name}</h3>
        <p>Rating: ${games[i].rating}</p>
        <p>Released: ${games[i].released}</p>
      </a>
        <span class="material-icons md-24 favorite-icon favorite-icon-small" data-id="${games[i].id}"> favorite_border </span>
      </div>`;
    }
  } catch (error) {
    console.log(error);
    errorContainer.innerHTML = errorMessage("An error occurred when calling the API, error: " + error);
  }
}

getGames();
