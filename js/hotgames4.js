const hotContainer = document.querySelector(".content-hot");

async function getGames() {
  try {
    const response = await fetch(URL);
    const results = await response.json();
    console.log(results);

    const games = results.results;

    hotContainer.innerHTML = "";

    for (let i = 0; i < games.length; i++) {
      if (i === 4) {
        break;
      }

      hotContainer.innerHTML += `<a href="/game-profile.html?id=${games[i].id}" class="card">
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

getGames();
