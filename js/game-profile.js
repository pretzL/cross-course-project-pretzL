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
const pageDescription = document.querySelector('meta[name="description"]').content;
const headingOne = document.querySelector("h1");
const headerImage = document.querySelector(".header-image-thinner");
const subHeading1 = document.querySelector(".subheading1");
const subHeading2 = document.querySelector(".subheading2");
const suggestedGames = document.querySelector(".suggested-games");

async function fetchSingleGame() {
  try {
    //INITIAL ID QUERY
    const response = await fetch(detailsURL);
    const singleResult = await response.json();
    console.log(singleResult);
    const gameGenres = singleResult.genres;

    let background2 = singleResult.background_image;

    if (singleResult.background_image_additional !== null) {
      background2 = singleResult.background_image_additional;
    }

    let developer = "Unknown";

    if (singleResult.developers.name !== null || singleResult.developers.name !== undefined) {
      developer = singleResult.developers[0].name;
    }

    pageTitle.innerHTML = `${singleResult.name}`;
    headingOne.innerHTML = `${singleResult.name}`;
    headerImage.style.backgroundImage = `linear-gradient(rgb(0, 0, 0, 0.5), rgb(0, 0, 0, 0.5)), url(${singleResult.background_image})`;
    subHeading1.style.background = `linear-gradient(rgb(0, 0, 0, 0.5), rgb(0, 0, 0, 0.5)), url(${background2})`;
    subHeading2.style.background = `linear-gradient(rgb(0, 0, 0, 0.5), rgb(0, 0, 0, 0.5)), url(${background2})`;
    headerImage.style.backgroundSize = "cover";
    headerImage.style.backgroundRepeat = "norepeat";
    headerImage.style.backgroundPosition = "center";
    subHeading1.style.backgroundSize = "cover";
    subHeading1.style.backgroundRepeat = "norepeat";
    subHeading1.style.backgroundPosition = "center";
    subHeading2.style.backgroundSize = "cover";
    subHeading2.style.backgroundRepeat = "norepeat";
    subHeading2.style.backgroundPosition = "center";

    const allGenres = gameGenres.map((game) => game.name).join(", ");

    const descriptionString = singleResult.description;

    const filteredSentences = descriptionString.split(".").filter((item, index) => {
      if (index < 7) {
        return item;
      }
    });

    gameInfo.innerHTML = `<img src=${singleResult.background_image} class="game-image-large game-grid1" />
                          <img src=${background2} class="game-image-small game-grid2" />
                          <div class="about-the-game game-grid3">
                          <p>Rating: ${singleResult.rating}</p>
                          <p>Release date: ${singleResult.released}</p>
                          <p>Developer: ${developer}</p>
                          <p>Tags: ${allGenres}</p>
                          <p>Price: $38</p>
                          <button class="cart-cta btn"><span class="material-icons md-18 cart-cta-icon"> shopping_cart </span>Add to Cart</button>
                          <div class="cart-validation-container"><p>Item added to cart</p></div>
                          </div>
                          <div class="game-summary game-grid4">
                          <h3>Summary</h3>
                          <p class="game-summary">${filteredSentences}</p>
                          </div>`;

    const validatorContainer = document.querySelector(".cart-validation-container");
    const cartCta = document.querySelector(".cart-cta");

    cartCta.onclick = () => {
      validatorContainer.classList.toggle("cart-cta-active");
    };

    //SUGGESTED GAMES QUERY

    let loopedGameSlugs = "";
    let slug1 = "adventure";
    let slug2 = "";

    for (let count = 0; count < gameGenres.length; count++) {
      if (count === 2) {
        break;
      }

      if (gameGenres[0].slug) {
        slug1 = gameGenres[0].slug;
      }

      if (gameGenres.slug) {
        slug2 = gameGenres[1].slug;
      }

      loopedGameSlugs += gameGenres[count].slug + ",";
    }

    const tags = `&genres=${slug1},${slug2}`;
    const suggestedURL = cors + baseURL + key + tags;
    const suggestedResponse = await fetch(suggestedURL);
    const suggestedSingleResult = await suggestedResponse.json();

    const suggestedGamesResult = suggestedSingleResult.results;

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
