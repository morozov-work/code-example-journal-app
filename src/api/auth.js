import { axios } from ".";
import { auth } from "@/utils/auth";

const urls = Object.freeze({
  API_LOGIN_URL: "/api_user_authenticate", // method: "POST"
  API_USER_URL: "/api_user_authenticate", // method: "GET"
  API_REFRESH_URL: "/api_user_authenticate", // method: "POST"
  API_LOGOUT_URL: "/api_user_authenticate", // method: "POST"
  API_REGISTRATION_URL: "/api_user_authenticate", // method: "POST"
  API_TEST_TOKEN_URL: "/api/bactericidal_logs?page=1", // method: "GET"
});

export function login(user) {
  return axios.post(urls.API_LOGIN_URL, user, {
    withCredentials: true,
  });
}

export function getUser() {
  return axios.get(urls.API_USER_URL);
}

export function refreshToken() {
  return axios.post(urls.API_REFRESH_URL);
}

export function logout() {
  return axios.post(urls.API_LOGOUT_URL);
}

export function registration(user) {
  return axios.post(urls.API_REGISTRATON_URL, user, {
    withCredentials: true,
  });
}

export function checkToken() {
  const AUTH_TOKEN = auth.getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };
  axios.get(urls.API_TEST_TOKEN_URL, config);
}
