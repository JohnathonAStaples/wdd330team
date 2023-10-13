// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export async function renderWithTemplate( //export function can be imported to other parts of your code
  templateFn, //parameter is a function that represents an HTML template
  parentElement, //parameter that is the DOM element where the rendered list will be inserted
  data, //this is the array that contains the items that will be rendered
  callback, //It's a function that you can provide to specify what should happen after rendering and inserting the HTML content into the parentElement
  position = "afterbegin", //parameter is an optional parameter that specifies where the rendered HTML should be inserted
  clear = true //optional parameter that that means before inserting rendered HTML, the parentElement content will be cleared
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const string = await templateFn(data);
  parentElement.insertAdjacentHTML(position, string);
  if (callback) {
    callback(data);
  }
}

function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

export const renderSuperscriptNumbers = () => {
  let cart = getLocalStorage("so-cart");
  let cartItems;
  if (cart) {
    cartItems = getLocalStorage("so-cart").length;
  } else {
    cartItems = 0;
  }
  const superscript = document.getElementById("cart-count");
  superscript.innerHTML = cartItems;
};

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  await renderWithTemplate(headerTemplateFn, headerElement);
  await renderWithTemplate(footerTemplateFn, footerElement);

  renderSuperscriptNumbers();
}
