import axios from "axios";

const url = Object.freeze({
  API_BASE_URL: "https://sjr.asap.dev03.spark-integration.ru",

  API_LOGIN_URL: "/api_user_authenticate", // method: "POST"
  API_USER_URL: "/api_user_authenticate", // method: "GET"
  API_REFRESH_URL: "/api_user_authenticate", // method: "POST"
  API_LOGOUT_URL: "/api_user_authenticate", // method: "POST"
  API_REGISTRATION_URL: "/api_user_authenticate", // method: "POST"
});

function getUrl(tail) {
  return `${url.API_BASE_URL}${url[tail]}`;
}

export function login(user) {
  return axios.post(getUrl("API_LOGIN_URL"), user, {
    withCredentials: true,
  });
}

export function getUser() {
  return axios.get(getUrl("API_USER_URL"));
}

export function refreshToken() {
  return axios.post(getUrl("API_REFRESH_URL"), {});
}

export function logout() {
  return axios.post(getUrl("API_LOGOUT_URL"), {});
}

export function registration(user) {
  return axios.post(getUrl("API_REGISTRATON_URL"), user, {
    withCredentials: true,
  });
}
