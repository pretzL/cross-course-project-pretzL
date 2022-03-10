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

getGames();
