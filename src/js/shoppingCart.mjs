import {
  getLocalStorage,
  renderSuperscriptNumbers,
  setLocalStorage,
} from "./utils.mjs";

// Function to render the shopping cart
export default function shoppingCart() {
  const output = document.querySelector(".product-list");
  const cartTotalValue = document.querySelector(".cart-total");

  const cartItems = getLocalStorage("so-cart");

  renderCartContents(cartItems, output, cartTotalValue);

  // Attach event listeners to the "X" buttons
  const removeButtons = document.querySelectorAll(".cart-item-remove");
  removeButtons.forEach((btn) => {
    btn.addEventListener("click", handleRemoveItem);
  });
}

function renderCartContents(cartItems, output, cartTotalValue) {
  if (!cartItems || cartItems.length === 0) {
    output.innerHTML = "No items in cart";
    cartTotalValue.style.display = "none"; // Hide the total when no items are in the cart
  } else {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    output.innerHTML = htmlItems.join("");
    const total = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);
    const formatTotal = "$" + total.toFixed(2);
    cartTotalValue.textContent = "Total: " + formatTotal;

    // Show the total when items are in the cart
    cartTotalValue.style.display = "block";
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider" style="position: relative;">
  <button class="cart-item-remove" data-id="${item.Id}" style="position: absolute; top: 5px; right: 5px; height: 20px; font-size: 10px;">X</button>
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

function handleRemoveItem(event) {
  const itemId = event.currentTarget.getAttribute("data-id");

  let cartItems = getLocalStorage("so-cart");

  cartItems = cartItems.filter((item) => item.Id !== itemId);

  setLocalStorage("so-cart", cartItems);

  shoppingCart(); // Update the cart view after item removal

  renderSuperscriptNumbers();
}

shoppingCart();
