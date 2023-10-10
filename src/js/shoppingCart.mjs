import { getLocalStorage, renderWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${item.Id}">
    <img
      src="${item.Image}"
      alt="Image of ${item.Name}"
    />
    <h3 class="card__brand">${item.Brand.Name}</h3>
    <h2 class="card__name">${item.NameWithoutBrand}</h2>
    <p class="product-card__price">$${item.FinalPrice}</p></a>
  </li>`;
}

export default async function shoppingCart() {
  const cartItems = getLocalStorage("so-cart");
  const output = document.querySelector(".product-list");
  renderWithTemplate(cartItemTemplate, output, cartItems);
}
