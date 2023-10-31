const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const message = await res.json();
  if (res.ok) {
    return message;
  } else {
    throw { name: "servicesError", message: message };
  }
}

export async function getProductsByCategory(category) {
  const res = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(res);
  return data.Result;
}

export async function findProductById(id) {
  const res = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(res);
  return product.Result;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}
