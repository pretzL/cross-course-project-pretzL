const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

// if the id is null, then redirect to the home page
if (id === null) {
  location.href = "/";
}

const baseURL = "https://api.rawg.io/api/games";
const key = "?key=35f9fd70b7b54c25bfa1662ebdeaff60";
const detailsURL = baseURL + "/" + id + key;

const cors = "https://noroffcors.herokuapp.com/";

const page_size = "&page_size=20";

let orderBy = "";

const gameInfo = document.querySelector(".game-info");
const pageTitle = document.querySelector("title");
const headingOne = document.querySelector("h1");
const headerImage = document.querySelector(".header-image-thinner");
const subHeading1 = document.querySelector(".subheading1");
const subHeading2 = document.querySelector(".subheading2");
const suggestedGames = document.querySelector(".suggested-games");

async function fetchSingleGame() {
  try {
    const response = await fetch(detailsURL);
    const singleResult = await response.json();

    console.log(singleResult);

    pageTitle.innerHTML = `${singleResult.name}`;
    headingOne.innerHTML = `${singleResult.name}`;
    headerImage.style.backgroundImage = `linear-gradient(rgb(0, 0, 0, 0.5), rgb(0, 0, 0, 0.5)), url(${singleResult.background_image})`;
    subHeading1.style.background = `linear-gradient(rgb(0, 0, 0, 0.5), rgb(0, 0, 0, 0.5)), url(${singleResult.background_image_additional})`;
    subHeading2.style.background = `linear-gradient(rgb(0, 0, 0, 0.5), rgb(0, 0, 0, 0.5)), url(${singleResult.background_image_additional})`;
    headerImage.style.backgroundSize = "cover";
    headerImage.style.backgroundRepeat = "norepeat";
    headerImage.style.backgroundPosition = "center";
    subHeading1.style.backgroundSize = "cover";
    subHeading1.style.backgroundRepeat = "norepeat";
    subHeading1.style.backgroundPosition = "center";
    subHeading2.style.backgroundSize = "cover";
    subHeading2.style.backgroundRepeat = "norepeat";
    subHeading2.style.backgroundPosition = "center";

    const gameGenres = singleResult.genres;

    gameInfo.innerHTML = `<img src=${singleResult.background_image} class="game-image-large game-grid1" />
                          <img src=${singleResult.background_image_additional} class="game-image-small game-grid2" />
                          <div class="about-the-game game-grid3">
                          <p>Rating: ${singleResult.rating}</p>
                          <p>Release date: ${singleResult.released}</p>
                          <p>Publisher: ${singleResult.publishers[0].name}</p>
                          <p>Tags: ${gameGenres[0].name}, ${gameGenres[1].name}</p>
                          <p>Price: $38</p>
                          <button class="cart-cta btn"><span class="material-icons md-18 cart-cta-icon"> shopping_cart </span>Add to Cart</button>
                          <div class="cart-validation-container"><p>Item added to cart</p></div>
                          </div>
                          <div class="game-summary game-grid4">
                          <h3>Summary</h3>
                          <p class="game-summary">${singleResult.description_raw}</p>
                          </div>`;

    const validatorContainer = document.querySelector(".cart-validation-container");
    const cartCta = document.querySelector(".cart-cta");

    cartCta.onclick = () => {
      validatorContainer.style.display = "block";
    };

    const tags = `&genres=${gameGenres[0].slug},${gameGenres[1].slug}`;
    const suggestedURL = cors + baseURL + key + tags;
    const suggestedResponse = await fetch(suggestedURL);
    const suggestedSingleResult = await suggestedResponse.json();

    const suggestedGamesResult = suggestedSingleResult.results;
    console.log(suggestedGamesResult);
    suggestedGames.innerHTML = "";

    const filteredID = Number(id);
    const filteredGames = suggestedGamesResult.filter((game) => game.id !== filteredID).slice(0, 3);

    for (let i = 0; i < filteredGames.length; i++) {
      if (i === 3) {
        break;
      }

      suggestedGames.innerHTML += `<a href="/game-profile.html?id=${filteredGames[i].id}" class="card">
          <img src="${filteredGames[i].background_image}" class="card-image" alt="${filteredGames[i].name}"/>
            <h3>${filteredGames[i].name}</h3>
            <p>Rating: ${filteredGames[i].rating}</p>
            <p>Released: ${filteredGames[i].released}</p>
            </a>`;
    }
  } catch (error) {
    console.log(error);
    errorContainer.innerHTML = errorMessage("An error occurred when calling the API, error: " + error);
  }
}

fetchSingleGame();
// TRY TO MERGE THESE TWO TOGETHER. NEW FETCH, PASS IN TAGS, DISPLAY IN SUGGESTED WITH FILTERED NUMBER FIX.
async function fetchSuggested() {
  try {
    const response = await fetch(baseURL + key);
    const results = await response.json();

    const games = results.results;

    suggestedGames.innerHTML = "";

    const filteredID = Number(id);
    const filteredGames = games.filter((game) => game.id !== filteredID).slice(0, 3);

    for (let i = 0; i < filteredGames.length; i++) {
      if (i === 3) {
        break;
      }

      suggestedGames.innerHTML += `<a href="/game-profile.html?id=${filteredGames[i].id}" class="card">
          <img src="${filteredGames[i].background_image}" class="card-image" alt="${filteredGames[i].name}"/>
            <h3>${filteredGames[i].name}</h3>
            <p>Rating: ${filteredGames[i].rating}</p>
            <p>Released: ${filteredGames[i].released}</p>
            </a>`;
    }
  } catch (error) {
    console.log(error);
    errorContainer.innerHTML = errorMessage("An error occurred when calling the API, error: " + error);
  }
}

fetchSuggested();
