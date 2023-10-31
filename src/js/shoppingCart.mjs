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

  const plusButtons = document.querySelectorAll(".plus-button");
  plusButtons.forEach((btn) => {
    btn.addEventListener("click", () =>
      handleQuantityButtonClick(btn, "increase")
    );
  });

  const minusButtons = document.querySelectorAll(".minus-button");
  minusButtons.forEach((btn) => {
    btn.addEventListener("click", () =>
      handleQuantityButtonClick(btn, "decrease")
    );
  });
}

function renderCartContents(cartItems, output, cartTotalValue) {
  if (!cartItems || cartItems.length === 0) {
    output.innerHTML = "No items in cart";
    cartTotalValue.style.display = "none"; // Hide the total when no items are in the cart
  } else {
    const htmlItems = cartItems.map((item) =>
      cartItemTemplate(item, item.quantity)
    );
    output.innerHTML = htmlItems.join("");
    const total = cartItems.reduce((acc, item) => {
      const itemCost = item.FinalPrice * item.quantity;
      return acc + itemCost;
    }, 0);
    const formatTotal = "$" + total.toFixed(2);
    cartTotalValue.textContent = "Total: " + formatTotal;

    // Show the total when items are in the cart
    cartTotalValue.style.display = "block";
  }
}

function cartItemTemplate(item, quantity) {
  const newItem = `<li class="cart-card divider" style="position: relative;">
  <button class="cart-item-remove" data-id="${item.Id}" style="position: absolute; top: -20px; right: -15px; height: 20px; font-size: 10px;">X</button>
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
    <div class="cart-card__quantity">
      <span>QTY: ${quantity}</span>
      <button class="quantity-button plus-button" data-id="${item.Id}" onclick="test()" >+</button>
      <button class="quantity-button minus-button" data-id="${item.Id}">-</button>
      
    </div>
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

function handleQuantityButtonClick(btn, action) {
  const itemId = btn.getAttribute("data-id");

  let cartItems = getLocalStorage("so-cart");

  const cartItem = cartItems.find((item) => item.Id === itemId);

  if (cartItem) {
    if (action === "increase") {
      cartItem.quantity++;
    } else if (action === "decrease") {
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      }
    }
  }

  setLocalStorage("so-cart", cartItems);

  shoppingCart();

  renderSuperscriptNumbers();
}

shoppingCart();
