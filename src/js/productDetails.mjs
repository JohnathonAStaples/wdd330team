import { findProductById } from "./externalServices.mjs";
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

  const productId = product.Id;

  const cartItem = cart.find((item) => item.Id === productId);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  setLocalStorage("so-cart", cart);
  animateCart();
  renderSuperscriptNumbers();
}

function renderProductDetails() {
  //update product name and details
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;

  //update product image
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;

  //get the element for product final price
  const priceElement = document.querySelector("#productFinalPrice");

  if (product.Discount !== undefined) {
    // If a discount is available, create a discount element

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

  const colorsCount = countValuesInArray(product.Colors);

  console.log('Number of colors:', colorsCount)
  addOptionsToSelect(product.Colors)

  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
  document.querySelector(".product-card__price").innerText = product.FinalPrice;

  
}

function countValuesInArray(array) {
  if (!Array.isArray(array)) {
    return 'Input is not an array.';
  }
  return array.length;
}

function addOptionsToSelect(array) {
  const selectElement = document.getElementById('colorChoice');
  
  array.forEach(function(value) {
    const option = document.createElement("button");
    let img = document.createElement("img");

    option.setAttribute("class", "colorButton")
    option.setAttribute("id", value.ColorName)

    img.setAttribute("src", value.ColorChipImageSrc);
    // colorChoiceListener(value.ColorName)
    option.appendChild(img);
    // const option = document.createElement('option');
    // option.value = value.ColorName;
    // option.text = value.ColorName;
    // selectElement.appendChild(option);
    selectElement.appendChild(option);
  });
  
}

// function colorChoiceListener(buttonId) {
//   const button = document.getElementById(buttonId);

//   button.addEventListener("click", saveColorChoice(buttonId));
// };

function saveColorChoice() {
  setLocalStorage("savedButtonId", buttonId);
  console.log(`Button ID "${buttonId}" saved to local storage.`);

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
