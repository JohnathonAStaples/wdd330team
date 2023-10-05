import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  try {
    // get the details for the current product. findProductById will return a promise!
    product = await findProductById(productId);
    
    // Check if the product is found
    if (product) {
      // once we have the product details we can render out the HTML
      renderProductDetails();
      // once the HTML is rendered we can add a listener to Add to Cart button
      document.getElementById("addToCart").addEventListener("click", addToCart);
    } else {
      // Handle the case where the product is not found
      displayProductNotFoundError();
      // Hide the Add to Cart button when no product is found
      document.getElementById("addToCart").style.display = "none";

    }
  } catch (error) {
    // Handle any other errors that might occur during the API request
    console.error("Error fetching product details:", error);
    displayError("An error occurred while fetching product details.");
    // Hide the Add to Cart button in case of an error
    document.getElementById("addToCart").style.display = "none";
  }
}
function addToCart() {
  const storedCart = getLocalStorage("so-cart");

  const cart = Array.isArray(storedCart) ? storedCart : [];

  cart.push(product);

  setLocalStorage("so-cart", cart);
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
function displayProductNotFoundError() {
  // Display an error message indicating that the product was not found
  //  show the error message
  const errorMessageElement = document.getElementById("errorMessage");
  errorMessageElement.innerText = "Product not found.";
  errorMessageElement.style.display = "block";
}

function displayError(errorMessage) {
  // Display a general error message
  // show the error message
  const errorMessageElement = document.getElementById("errorMessage");
  errorMessageElement.innerText = errorMessage;
  errorMessageElement.style.display = "block";
}


  
