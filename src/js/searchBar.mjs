import { searchQuery } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const searchTerm = searchInput.value;
  console.log(searchTerm);
  displaySearchResults("#search-results", searchTerm);
});

function searchResultsTemplate(product) {
  return `<li class="product-list">
    <a href="../product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`;
}

const displaySearchResults = async (selector, search) => {
  const el = document.querySelector(selector);

  const searchResults = await searchQuery(search);

  renderListWithTemplate(searchResultsTemplate, el, searchResults);
};
