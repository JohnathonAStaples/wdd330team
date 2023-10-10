import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";

loadHeaderFooter();
shoppingCart();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const cartList = document.querySelector(".product-list");
  const cartTotalValue = document.querySelector(".cart-total");

  if (!cartItems || cartItems.length === 0) {
    cartList.innerHTML = "No items in cart";
    cartTotalValue.style.display = "none"; // Hide the total when no items are in the cart
  } else {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    cartList.innerHTML = htmlItems.join("");
    const total = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);
    const formatTotal = "$" + total.toFixed(2);
    cartTotalValue.textContent = "Total: " + formatTotal;

    // Show the total when items are in the cart
    cartTotalValue.style.display = "block";
  }

  // Attach event listeners to the "X" buttons
  const removeButtons = document.querySelectorAll(".cart-item-remove");
  removeButtons.forEach((btn) => {
    btn.addEventListener("click", handleRemoveItem);
  });
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <button class="cart-item-remove" data-id="${item.Id}">X</button>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

const handleRemoveItem = (event) => {
  const itemId = event.currentTarget.getAttribute("data-id");

  let cartItems = getLocalStorage("so-cart");

  cartItems = cartItems.filter((item) => item.Id !== itemId);

  setLocalStorage("so-cart", cartItems);

  renderCartContents();
};

renderCartContents();
