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
let secondItemNumber = 1;

let firstItemPriceTotal = firstItemPrice * firstItemNumber;
let secondItemPriceTotal = secondItemPrice * secondItemNumber;

let totalPriceTotal = firstItemPriceTotal + secondItemPriceTotal;

itemTotalPrice.innerHTML = "Total: " + "$" + parseFloat(totalPriceTotal).toFixed(2);

itemOneMinusButton.onclick = () => {
  firstItemNumber--;
  firstItemPriceTotal = firstItemPrice * firstItemNumber;
  itemOneTotalNumber.innerHTML = firstItemNumber;
  itemOnePrice.innerHTML = "$" + parseFloat(firstItemPriceTotal).toFixed(2);
  priceCalc();
};

itemOnePlusButton.onclick = () => {
  firstItemNumber++;
  firstItemPriceTotal = firstItemPrice * firstItemNumber;
  itemOneTotalNumber.innerHTML = firstItemNumber;
  itemOnePrice.innerHTML = "$" + parseFloat(firstItemPriceTotal).toFixed(2);
  priceCalc();
};

itemTwoMinusButton.onclick = () => {
  secondItemNumber--;
  secondItemPriceTotal = secondItemPrice * secondItemNumber;
  itemTwoTotalNumber.innerHTML = secondItemNumber;
  itemTwoPrice.innerHTML = "$" + parseFloat(secondItemPriceTotal).toFixed(2);
  priceCalc();
};

itemTwoPlusButton.onclick = () => {
  secondItemNumber++;
  secondItemPriceTotal = secondItemPrice * secondItemNumber;
  itemTwoTotalNumber.innerHTML = secondItemNumber;
  itemTwoPrice.innerHTML = "$" + parseFloat(secondItemPriceTotal).toFixed(2);
  priceCalc();
};

function priceCalc() {
  totalPriceTotal = firstItemPriceTotal + secondItemPriceTotal;
  itemTotalPrice.innerHTML = "Total: " + "$" + parseFloat(totalPriceTotal).toFixed(2);
}
