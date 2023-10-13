import { findProductById } from "./productData.mjs";
import {
  setLocalStorage,
  getLocalStorage,
  renderSuperscriptNumbers,
  loadHeaderFooter,
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
  renderSuperscriptNumbers();
}

function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Image;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
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
