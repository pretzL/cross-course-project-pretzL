const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

// if the id is null, then redirect to the home page
if (id === null) {
  location.href = "/";
}

const key = "?key=35f9fd70b7b54c25bfa1662ebdeaff60";
const detailsURL = "https://api.rawg.io/api/games/" + id + key;

const gameInfo = document.querySelector(".game-info");
const pageTitle = document.querySelector("title");
const headingOne = document.querySelector("h1");
const headerImage = document.querySelector(".header-image-thinner");

async function fetchSingleGame() {
  try {
    const response = await fetch(detailsURL);
    const singleResult = await response.json();
    console.log(singleResult);

    pageTitle.innerHTML = `${singleResult.name}`;
    headingOne.innerHTML = `${singleResult.name}`;
    headerImage.style.background = `linear-gradient(rgb(0, 0, 0, 0.5), rgb(0, 0, 0, 0.5)), url(${singleResult.background_image})`;

    const gameGenres = singleResult.genres;

    gameInfo.innerHTML = `<img src=${singleResult.background_image} class="game-image-large game-grid1" />
                          <img src=${singleResult.background_image_additional} class="game-image-small game-grid2" />
                          <div class="about-the-game game-grid3">
                          <p>Rating: ${singleResult.rating}</p>
                          <p>Release date: ${singleResult.released}</p>
                          <p>Publisher: ${singleResult.publishers[0].name}</p>
                          <p>Tags: ${gameGenres[0].name}, ${gameGenres[1].name}</p>
                          </div>
                          <div class="game-summary game-grid4">
                          <h3>Summary</h3>
                          <p class="game-summary">${singleResult.description_raw}</p>
                          </div>`;
  } catch (error) {
    console.log(error);
    errorContainer.innerHTML = errorMessage("An error occurred when calling the API, error: " + error);
  }
}

fetchSingleGame();
