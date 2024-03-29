import { getProductsByCategory } from "./externalServices.mjs"; //importing product list data
import { renderListWithTemplate } from "./utils.mjs"; //importing function that is used to render lists of items using a template function

function productCardTemplate(product) {
  //function that takes a product as an object and returns an HTML template string
  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`;
}

export default async function productList(selector, category) {
  const el = document.querySelector(selector);

  // Get the list of products
  const products = await getProductsByCategory(category);

  // const filteredProducts = products.slice(0, 4);

  // Render out the product list with the filtered products
  renderListWithTemplate(productCardTemplate, el, products);
  document.querySelector(".title").innerHTML = category;
}
