export function getExistingCart() {
  const cart = localStorage.getItem("cart");

  if (!cart) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

export function cartItemsLength() {
  const cartIcon = document.querySelector(".cart-number-icon");

  cartIcon.innerHTML = JSON.parse(localStorage.cart).length;
}

cartItemsLength();
