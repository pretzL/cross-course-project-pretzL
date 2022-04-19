import { getExistingFavorites } from "./components/favoriteFunctions.js";
import { getExistingCart } from "./components/cartFunctions.js";
import { cartItemsLength } from "./components/cartFunctions.js";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

// if the id is null, then redirect to the home page
if (id === null) {
  location.href = "/";
}

const URL = "https://pretzl.one/gamehub-wp/wp-json/wc/v3/products/";

const key = "?consumer_key=ck_44e09142efd549e6fc0fccc82da53cd3c729ed35&consumer_secret=cs_1c51b536d5c44192e46721509bf3a9d1eecc07af";

const detailsURL = URL + id + key;

const gameInfo = document.querySelector(".game-info");
const pageTitle = document.querySelector("title");
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

    pageTitle.innerHTML = `${singleResult.name}`;
    headingOne.innerHTML = `${singleResult.name}`;
    headerImage.style.backgroundImage = `linear-gradient(rgb(0, 0, 0, 0.5), rgb(0, 0, 0, 0.5)), url(${singleResult.images[0].src})`;
    subHeading1.style.background = `linear-gradient(rgb(0, 0, 0, 0.5), rgb(0, 0, 0, 0.5)), url(${singleResult.images[1].src})`;
    subHeading2.style.background = `linear-gradient(rgb(0, 0, 0, 0.5), rgb(0, 0, 0, 0.5)), url(${singleResult.images[1].src})`;
    headerImage.style.backgroundSize = "cover";
    headerImage.style.backgroundRepeat = "norepeat";
    headerImage.style.backgroundPosition = "center";
    subHeading1.style.backgroundSize = "cover";
    subHeading1.style.backgroundRepeat = "norepeat";
    subHeading1.style.backgroundPosition = "center";
    subHeading2.style.backgroundSize = "cover";
    subHeading2.style.backgroundRepeat = "norepeat";
    subHeading2.style.backgroundPosition = "center";

    let iconHTML = " favorite_border ";

    const getFavorites = getExistingFavorites();

    const ifObjectExist = getFavorites.find(function (fav) {
      return Number(fav.id) === Number(singleResult.id);
    });

    if (ifObjectExist) {
      iconHTML = " favorite ";
    }

    gameInfo.innerHTML = `<img src=${singleResult.images[0].src} class="game-image-large game-grid1" />
                          <img src=${singleResult.images[1].src} class="game-image-small game-grid2" />
                          <div class="about-the-game game-grid3">
                          <p>Rating: ${singleResult.attributes[0].options[0]}</p>
                          <p>Release date: ${singleResult.attributes[1].options[0]}</p>
                          <p>Developer: ${singleResult.attributes[2].options[0]}</p>
                          <p>Tags: ${singleResult.attributes[3].options[0]}</p>
                          <p>Price: $${singleResult.price}</p>
                          <div class="game-profile-buttons">
                          <button class="cart-cta btn open-button add-to-cart-cta"><span class="material-icons md-18 cart-cta-icon"> shopping_cart </span>Add to Cart</button>
                          <span class="material-icons md-36 favorite-icon" data-id="${singleResult.id}" data-img="${singleResult.images[0].src}" data-name="${singleResult.name}" data-rating="${singleResult.attributes[0].options[0]}" data-rel="${singleResult.attributes[1].options[0]}">${iconHTML}</span>
                          </div>
                          <dialog class="modal" id="modal">
                            <p>Item added to cart!</p>
                            <div class="flex modal-buttons">
                            <button class="cart-cta btn close-button">Close</button>
                            <button class="cart-cta btn checkout-button">Cart</button>
                            </div>
                          </dialog>
                          </div>
                          <div class="game-summary game-grid4">
                          <h3>Summary</h3>
                          <p class="game-summary">${singleResult.description}</p>
                          </div>`;
    // MODAL

    const modal = document.querySelector("#modal");
    const openButton = document.querySelector(".open-button");
    const closeButton = document.querySelector(".close-button");

    const checkoutButton = document.querySelector(".checkout-button");

    openButton.addEventListener("click", () => {
      modal.showModal();
    });

    closeButton.addEventListener("click", () => {
      modal.close();
    });

    checkoutButton.onclick = () => {
      location.href = "/cart.html";
    };

    //FAVORITE ICON

    const favoriteIcon = document.querySelector(".favorite-icon");

    favoriteIcon.addEventListener("click", handleClick);

    const favorites = getExistingFavorites();

    const doesObjectExist = favorites.find(function (fav) {
      return fav.id === singleResult.id;
    });

    if (doesObjectExist) {
      favoriteIcon.innerHTML = " favorite ";
    }

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

    // ADD TO CART

    const cartCtaButton = document.querySelector(".add-to-cart-cta");

    cartCtaButton.addEventListener("click", handleCart);

    function handleCart() {
      const currentCart = getExistingCart();

      const cartExists = currentCart.find(function (item) {
        return item.id === singleResult.id;
      });

      if (!cartExists) {
        const gameToCart = singleResult;

        currentCart.push(gameToCart);

        saveCart(currentCart);
      } else {
        const newCart = currentCart.filter((item) => item.id !== singleResult.id);
        saveCart(newCart);
      }
    }

    function saveCart(cartItem) {
      localStorage.setItem("cart", JSON.stringify(cartItem));
      cartItemsLength();
    }

    //SUGGESTED GAMES QUERY

    /* let loopedGameSlugs = "";
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
    } */
  } catch (error) {
    console.log(error);
    errorContainer.innerHTML = errorMessage("An error occurred when calling the API, error: " + error);
  }
}

fetchSingleGame();
