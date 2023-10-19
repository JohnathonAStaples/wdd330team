import { findProductById } from "./productData.mjs";
import {
  setLocalStorage,
  getLocalStorage,
  renderSuperscriptNumbers,
  loadHeaderFooter,
  animateCart,
} from "./utils.mjs";

let product = {};

loadHeaderFooter();
export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}

function addToCart() {
  const storedCart = getLocalStorage("so-cart");

  const cart = Array.isArray(storedCart) ? storedCart : [];

  cart.push(product);
  setLocalStorage("so-cart", cart);
  animateCart();
  renderSuperscriptNumbers();
}

function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;

  const priceElement = document.querySelector("#productFinalPrice");

  if (product.Discount !== undefined) {
    // Display the discount amount and percentage
    const discountElement = document.createElement("p");
    discountElement.id = "productDiscount";
    discountElement.innerHTML = `Discount: $${product.Discount.Amount} (${product.Discount.Percent}%)`;
    discountElement.classList.add("discount");

    // Append the discountElement to the product-detail section
    document.querySelector(".product-detail").appendChild(discountElement);

    // Cross out the original price
    priceElement.style.textDecoration = "line-through";

    // Calculate and display the discounted price
    const discountedPrice = product.FinalPrice - product.Discount.Amount;
    const discountedPriceElement = document.createElement("p");
    discountedPriceElement.innerHTML = `Discounted Price: $${discountedPrice.toFixed(
      2
    )}`;
    priceElement.insertAdjacentElement("afterend", discountedPriceElement);
  }

  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}

// function displayProductNotFoundError(showError) {
//   // Display or hide the error message based on the 'showError' parameter
//   const errorMessageElement = document.getElementById("errorMessage");
//   errorMessageElement.innerText = "Product not found.";
//   errorMessageElement.style.display = showError ? "block" : "none";
// }

// function displayError(errorMessage) {
//   // Display a general error message
//   // show the error message
//   const errorMessageElement = document.getElementById("errorMessage");
//   errorMessageElement.innerText = errorMessage;
//   errorMessageElement.style.display = "block";
// }
