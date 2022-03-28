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

let price = 19.94;

let priceTotal = price * itemNumber;

for (let i = 0; i < carts.length; i++) {
  cartContainer.innerHTML += `
      <div class="cart-item">
        <div class="cart-image-container item-grid1">
          <img src="${carts[i].background_image}" class="cart-image-small" alt="Cart Item Image Small" />
        </div>
        <p class="item-grid2">${carts[i].name}</p>
        <div class="item-one-total-counter item-grid3">
          <button class="item-number-minus">-</button>
          <p class="item-total-number">${itemNumber}</p>
          <button class="item-number-plus">+</button>
        </div>
        <p class="item-price item-grid4">$ ${priceTotal}</p>
        <div class="item-trashcan item-grid5"><span class="material-icons"> delete </span></div>
      </div>`;

  // PRICE CALCULATOR

  const itemMinusButton = document.querySelectorAll(".item-number-minus");
  const itemPlusButton = document.querySelectorAll(".item-number-plus");
  const itemTotalNumber = document.querySelectorAll(".item-total-number");
  const itemPrice = document.querySelectorAll(".item-price");

  itemMinusButton.forEach((button) => {
    button.addEventListener("click", minusCalc);
  });

  itemPlusButton.forEach((button) => {
    button.addEventListener("click", plusCalc);
  });

  function minusCalc() {
    itemNumber--;
    console.log("minus");
    itemTotalNumber.innerHTML = itemNumber;
    itemPrice.innerHTML = "$" + price * itemNumber;
  }

  function plusCalc() {
    itemNumber++;
    console.log("plus");
    itemTotalNumber.innerHTML = itemNumber;
    itemPrice.innerHTML = "$" + price * itemNumber;
  }

  const itemTotalPrice = document.querySelector(".item-total-price");
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
