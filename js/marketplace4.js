const marketplaceContainer = document.querySelector(".content-marketplace");

async function getMarketplaceGames() {
  try {
    const response = await fetch(URL);
    const results = await response.json();
    console.log(results);

    const games = results.results;

    marketplaceContainer.innerHTML = "";

    for (let i = 4; i < games.length; i++) {
      if (i === 8) {
        break;
      }

      marketplaceContainer.innerHTML += `<a href="/details.html?id=${games[i].id}" class="card">
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

getMarketplaceGames();
