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

const URL = "https://api.rawg.io/api/games";

const key = "?key=35f9fd70b7b54c25bfa1662ebdeaff60";

const ownedGamesContainer = document.querySelector(".user-owned-games-content");
const purchasedGamesContainer = document.querySelector(".user-purchased-games-content");

async function getGames() {
  try {
    const response = await fetch(URL + key);
    const results = await response.json();

    const games = results.results;

    ownedGamesContainer.innerHTML = "";
    purchasedGamesContainer.innerHTML = "";

    for (let i = 0; i < games.length; i++) {
      if (i === 3) {
        break;
      }

      ownedGamesContainer.innerHTML += `<a href="/game-profile.html?id=${games[i].id}" class="card">
          <img src="${games[i].background_image}" class="card-image" alt="${games[i].name}"/>
            <h3>${games[i].name}</h3>
            <p>Rating: ${games[i].rating}</p>
            <p>Released: ${games[i].released}</p>
            </a>`;
    }

    for (let i = 3; i < games.length; i++) {
      if (i === 6) {
        break;
      }

      purchasedGamesContainer.innerHTML += `<a href="/game-profile.html?id=${games[i].id}" class="card">
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

getGames();
