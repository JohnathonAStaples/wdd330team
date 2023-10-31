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
  if (cart && Array.isArray(cart)) {
    cartItems = cart.reduce((count, item) => count + item.quantity, 0);
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

export function animateCart() {
  const cartIcon = document.getElementById("backpack-icon");

  if (cartIcon) {
    cartIcon.classList.add("shaking");

    setTimeout(() => {
      cartIcon.classList.remove("shaking");
    }, 1000);
  }
}

export function alertMessage(message, scroll = true) {
  // create element to hold our alert
  const alert = document.createElement("div");
  // add a class to style the alert
  alert.classList.add("alert");
  // set the contents. You should have a message and an X or something the user can click on to remove
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener("click", function (e) {
    if (e.target.tagname == "SPAN") {
      // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
      main.removeChild(this);
    }
  });
  // add the alert to the top of main
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}
