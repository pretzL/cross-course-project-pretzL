const URL = "https://api.rawg.io/api/games";

const key = "?key=35f9fd70b7b54c25bfa1662ebdeaff60";

const gamesContainer = document.querySelector(".all-games-content");

async function getGames() {
  try {
    const response = await fetch(URL + key);
    const results = await response.json();

    const games = results.results;

    gamesContainer.innerHTML = "";

    for (let i = 0; i < games.length; i++) {
      if (games[i].rating === 0) {
        continue;
      }

      gamesContainer.innerHTML += `<div class="card">
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
