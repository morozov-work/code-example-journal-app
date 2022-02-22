import * as _axios from "axios";
import store from "@/store";
import router from "@/router";
import { auth } from "@/utils/auth";

const API_BASE_URL = "https://sjr.asap.dev03.spark-integration.ru";

const axios = _axios.create({
  baseURL: API_BASE_URL,
});

const errorHandler = (error) => {
  console.log("Error", error.message);
};

axios.interceptors.request.use((config) => {
  const isAuthorized = store.getters["auth/GET_AUTH_USER"];
  const AUTH_TOKEN = auth.getToken();
  // console.log(AUTH_TOKEN || "token not found");
  if (AUTH_TOKEN && isAuthorized) {
    config.headers["Authorization"] = "Bearer " + AUTH_TOKEN;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.commit("auth/SET_AUTH_USER", false);
      router.push({ name: "login" });
    }
  }
);

export { axios, errorHandler };
