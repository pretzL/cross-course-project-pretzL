import { getExistingCart } from "./components/cartFunctions.js";
import { cartItemsLength } from "./components/cartFunctions.js";

const checkoutButton = document.querySelector(".checkout-btn");

// CART LOCAL STORAGE

const cartContainer = document.querySelector(".cart-container");

const carts = getExistingCart();

if (carts.length === 0) {
  cartContainer.innerHTML = `<p class="cart-error">You have no games in your cart.</p>`;
}

let itemNumber = 1;

for (let i = 0; i < carts.length; i++) {
  cartContainer.innerHTML += `
      <div class="cart-item">
        <div class="cart-image-container item-grid1">
          <img src="${carts[i].images[0].src}" class="cart-image-small" alt="Cart Item Image Small" />
        </div>
        <p class="item-grid2">${carts[i].name}</p>
        <div class="item-total-counter item-grid3">
          <button class="item-number-minus" data-type="minus">-</button>
          <p class="item-total-number" data-type="number">${itemNumber}</p>
          <button class="item-number-plus" data-type="plus">+</button>
        </div>
        <p class="item-price item-grid4" data-type="price">$${carts[i].price}</p>
        <div class="item-trashcan item-grid5"><span class="material-icons"> delete </span></div>
      </div>`;
}

// REMOVE ITEM FROM CART

const trashIcon = document.querySelectorAll(".item-trashcan");

trashIcon.forEach((button) => {
  button.addEventListener("click", removeFromCart);
});

function removeFromCart() {
  carts.forEach((cartItem) => {
    const cartExists = carts.find(function (car) {
      return car.id === cartItem.id;
    });

    if (!cartExists) {
      const gameToCart = cartItem;

      currentCart.push(gameToCart);

      saveCart(currentCart);
    } else {
      const newItem = carts.filter((car) => car.id !== cartItem.id);
      saveCart(newItem);
    }
  });
}

function saveCart(cartItem) {
  localStorage.setItem("cart", JSON.stringify(cartItem));
  cartItemsLength();
  location.reload();
}

// CHECKOUT BUTTON REDIRECT

checkoutButton.onclick = () => {
  location.href = "/checkout.html";
};
