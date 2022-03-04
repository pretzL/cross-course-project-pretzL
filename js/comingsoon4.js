const URL = "https://api.rawg.io/api/games?key=35f9fd70b7b54c25bfa1662ebdeaff60";

const comingSoonContainer = document.querySelector(".content-coming-soon");

async function getUpcomingGames() {
  try {
    const response = await fetch(URL);
    const results = await response.json();
    console.log(results);

    const games = results.results;

    hotContainer.innerHTML = "";

    for (let i = 8; i < games.length; i++) {
      if (i === 12) {
        break;
      }

      comingSoonContainer.innerHTML += `<a href="/details.html?id=${games[i].id}" class="card">
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

getUpcomingGames();
