const itemOneMinusButton = document.querySelector(".item-one-number-minus");
const itemOnePlusButton = document.querySelector(".item-one-number-plus");

const itemTwoMinusButton = document.querySelector(".item-two-number-minus");
const itemTwoPlusButton = document.querySelector(".item-two-number-plus");

const itemOneTotalNumber = document.querySelector(".item-one-total-number");
const itemTwoTotalNumber = document.querySelector(".item-two-total-number");

const itemOnePrice = document.querySelector(".item-one-price");
const itemTwoPrice = document.querySelector(".item-two-price");

const itemTotalPrice = document.querySelector(".item-total-price");

let firstItemPrice = 40.83;
let secondItemPrice = 19.94;

let firstItemNumber = 1;
let secondItemNumber = 2;

itemOneMinusButton.onclick = () => {
  firstItemNumber--;
  let firstItemPriceTotal = "$" + firstItemPrice * firstItemNumber;
  itemOneTotalNumber.innerHTML = firstItemNumber;
  itemOnePrice.innerHTML = firstItemPriceTotal;
};

itemOnePlusButton.onclick = () => {
  firstItemNumber++;
  let firstItemPriceTotal = firstItemPrice * firstItemNumber;
  itemOneTotalNumber.innerHTML = firstItemNumber;
  itemOnePrice.innerHTML = firstItemPriceTotal;
};

itemTwoMinusButton.onclick = () => {
  secondItemNumber--;
  let secondItemPriceTotal = secondItemPrice * secondItemNumber;
  itemTwoTotalNumber.innerHTML = secondItemNumber;
  itemTwoPrice.innerHTML = secondItemPriceTotal;
};

itemTwoPlusButton.onclick = () => {
  secondItemNumber++;
  let secondItemPriceTotal = secondItemPrice * secondItemNumber;
  itemTwoTotalNumber.innerHTML = secondItemNumber;
  itemTwoPrice.innerHTML = secondItemPriceTotal;
};

let totalPriceTotal = firstItemPriceTotal + secondItemPriceTotal;

itemTotalPrice.innerHTML = "Total:" + totalPriceTotal;
