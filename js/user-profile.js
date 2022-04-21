import { getExistingFavorites } from "./components/favoriteFunctions.js";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const username = params.get("name");

const headingOne = document.querySelector("h1");
const usernameText = document.querySelector(".username-text");

if (username === null) {
  headingOne.innerText = "User Profile";
  usernameText.innerText = "Username";
} else {
  headingOne.innerText = username + "`s profile";
  usernameText.innerText = username;
}

const URL = "https://pretzl.one/gamehub-wp/wp-json/wc/v3/products?per_page=20";

const key = "&consumer_key=ck_44e09142efd549e6fc0fccc82da53cd3c729ed35&consumer_secret=cs_1c51b536d5c44192e46721509bf3a9d1eecc07af";

const favoriteGamesContainer = document.querySelector(".user-favorite-games-content");
const purchasedGamesContainer = document.querySelector(".user-purchased-games-content");

async function getGames() {
  try {
    const response = await fetch(URL + key);
    const results = await response.json();

    const games = results;

    favoriteGamesContainer.innerHTML = "";
    purchasedGamesContainer.innerHTML = "";

    const favorites = getExistingFavorites();

    if (favorites.length === 0) {
      favoriteGamesContainer.innerHTML = `<p class="favorites-error">You have no games in your favorites.</p>`;
    }

    for (let i = 0; i < favorites.length; i++) {
      if (i === 3) {
        break;
      }

      let iconHTML = " favorite_border ";

      const favorites = getExistingFavorites();

      const doesObjectExist = favorites.find(function (fav) {
        return Number(fav.id) === Number(favorites[i].id);
      });

      if (doesObjectExist) {
        iconHTML = " favorite ";
      }

      favoriteGamesContainer.innerHTML += `<div class="card">
      <a href="/game-profile.html?id=${favorites[i].id}">
        <img src="${favorites[i].background_image}" class="card-image" alt="${favorites[i].name}"/>
        <h3>${favorites[i].name}</h3>
        <p>Rating: ${favorites[i].rating}</p>
        <p>Released: ${favorites[i].released}</p>
      </a>
      <span class="material-icons md-24 favorite-icon favorite-icon-small">${iconHTML}</span>
      </div>`;
    }

    for (let i = 0; i < games.length; i++) {
      if (i === 3) {
        break;
      }

      let iconHTML = " favorite_border ";

      const favorites = getExistingFavorites();

      const doesObjectExist = favorites.find(function (fav) {
        return Number(fav.id) === Number(games[i].id);
      });

      if (doesObjectExist) {
        iconHTML = " favorite ";
      }

      purchasedGamesContainer.innerHTML += `<div class="card">
      <a href="/game-profile.html?id=${games[i].id}">
        <img src="${games[i].images[0].src}" class="card-image" alt="${games[i].name}"/>
        <h3>${games[i].name}</h3>
        <p>Rating: ${games[i].attributes[0].options[0]}</p>
        <p>Released: ${games[i].attributes[1].options[0]}</p>
      </a>
      <span class="material-icons md-24 favorite-icon favorite-icon-small" data-id="${games[i].id}" data-img="${games[i].images[0].src}" data-name="${games[i].name}" data-rating="${games[i].attributes[0].options[0]}" data-rel="${games[i].attributes[1].options[0]}">${iconHTML}</span>
      </div>`;
    }

    // FAVORITES SYSTEM

    const favoriteButtons = document.querySelectorAll(".favorite-icon");

    favoriteButtons.forEach((button) => {
      button.addEventListener("click", handleClick);
    });

    function handleClick({ target }) {
      if (target.innerHTML === " favorite_border ") {
        target.innerHTML = " favorite ";
      } else {
        target.innerHTML = " favorite_border ";
      }

      const gameId = this.dataset.id;
      const gameImg = this.dataset.img;
      const gameName = this.dataset.name;
      const gameRating = this.dataset.rating;
      const gameRel = this.dataset.rel;

      const currentFavorites = getExistingFavorites();

      const favoriteExists = currentFavorites.find(function (fav) {
        return fav.id === gameId;
      });

      if (!favoriteExists) {
        const gameToFavorite = { id: gameId, background_image: gameImg, name: gameName, rating: gameRating, released: gameRel };
        currentFavorites.push(gameToFavorite);

        saveFavorites(currentFavorites);
      } else {
        const newFavorites = currentFavorites.filter((fav) => fav.id !== gameId);
        saveFavorites(newFavorites);
      }
    }

    function saveFavorites(fav) {
      localStorage.setItem("favorites", JSON.stringify(fav));
    }
  } catch (error) {
    console.log(error);
    errorContainer.innerHTML = errorMessage("An error occurred when calling the API, error: " + error);
  }
}

getGames();
