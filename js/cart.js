const itemOneMinusButton = document.querySelector(".item-one-number-minus");
const itemOnePlusButton = document.querySelector(".item-one-number-plus");

const itemTwoMinusButton = document.querySelector(".item-two-number-minus");
const itemTwoPlusButton = document.querySelector(".item-two-number-plus");

const itemOneTotalNumber = document.querySelector(".item-one-total-number");
const itemTwoTotalNumber = document.querySelector(".item-two-total-number");

const itemOnePrice = document.querySelector(".item-one-price");
const itemTwoPrice = document.querySelector(".item-two-price");

const itemTotalPrice = document.querySelector(".item-total-price");

const checkoutButton = document.querySelector(".checkout-btn");

checkoutButton.onclick = () => {
  location.href = "/checkout.html";
};

let firstItemPrice = 40.83;
let secondItemPrice = 19.94;

let firstItemNumber = 1;
let secondItemNumber = 2;

itemOneMinusButton.onclick = () => {
  firstItemNumber -= 1;
  let firstItemPriceTotal = firstItemPrice * firstItemNumber;
  itemOneTotalNumber.innerHTML = firstItemNumber;
  itemOnePrice.innerHTML = "$" + parseFloat(firstItemPriceTotal).toFixed(2);
};

itemOnePlusButton.onclick = () => {
  firstItemNumber += 1;
  let firstItemPriceTotal = firstItemPrice * firstItemNumber;
  itemOneTotalNumber.innerHTML = firstItemNumber;
  itemOnePrice.innerHTML = "$" + parseFloat(firstItemPriceTotal).toFixed(2);
};

itemTwoMinusButton.onclick = () => {
  secondItemNumber -= 1;
  let secondItemPriceTotal = secondItemPrice * secondItemNumber;
  itemTwoTotalNumber.innerHTML = secondItemNumber;
  itemTwoPrice.innerHTML = "$" + parseFloat(secondItemPriceTotal).toFixed(2);
};

itemTwoPlusButton.onclick = () => {
  secondItemNumber += 1;
  let secondItemPriceTotal = secondItemPrice * secondItemNumber;
  itemTwoTotalNumber.innerHTML = secondItemNumber;
  itemTwoPrice.innerHTML = "$" + parseFloat(secondItemPriceTotal).toFixed(2);
};

let totalPriceTotal = firstItemPriceTotal + secondItemPriceTotal;

itemTotalPrice.innerHTML = "Total:" + "$" + totalPriceTotal;
