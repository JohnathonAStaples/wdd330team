import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import * as jwt_decode from "jwt-decode";

const tokenKey = "so-token";

const isTokenValid = (token) => {
  if (token) {
    const decode = jwt_decode(token);

    let currentDate = new Date();

    if (decode.exp * 1000 < currentDate.getTime()) {
      console.log("Token Expired");
      return false;
    } else {
      console.log("valid token");
      return true;
    }
  } else return false;
};

export const checkLogin = () => {
  const token = getLocalStorage(tokenKey);

  const valid = isTokenValid(token);

  if (!valid) {
    localStorage.removeItem(tokenKey);
    const location = window.location;
    console.log(location);
    window.location = `/login/index.html?redirect${location.pathname}`;
  } else return token;
};

export const login = async (creds, redirect = "/") => {
  try {
    const token = await loginRequest(creds);
    setLocalStorage(tokenKey, token);
    window.location = redirect;
  } catch (err) {
    alertMessage(err.message.message);
  }
};
