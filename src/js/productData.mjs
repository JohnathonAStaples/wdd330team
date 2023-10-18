const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getData(category) {
  const res = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(res);
  return data.Result;
}

export async function findProductById(id) {
  const res = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(res);
  return product.Result;
}
